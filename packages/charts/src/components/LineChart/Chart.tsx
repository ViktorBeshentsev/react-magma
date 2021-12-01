import * as React from 'react';
import {
  I18nContext,
  styled,
  ThemeContext,
  useDescendants,
} from 'react-magma-dom';

import { LineChart, LineChartProps } from './LineChart';
import { ChartDataTable } from './ChartDataTable';
import {
  Paragraph,
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
  TypographyVisualStyle,
} from 'react-magma-dom';

interface BaseChartProps {
  description?: string;
  testId?: string;
  title: string;
  type: string;
}
export interface ChartProps<T extends any>
  extends BaseChartProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    LineChartProps<T> {}

const StyledTitle = styled.span`
  color: ${props => props.theme.colors.neutral};
  font-size: ${props => props.theme.typeScale.size04.fontSize};
  font-weight: 600;
  line-height: ${props => props.theme.typeScale.size04.lineHeight};
  margin: 0 0 12px 0;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  margin: 0 0 18px 0;
`;

const StyledTabsContainer = styled(TabsContainer)`
  width: 800px;
  ul {
    box-shadow: inset 0 -1px 0 ${props => props.theme.colors.neutral06};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 22px 0;
`;

function BaseChart<T>(
  props: ChartProps<T>,
  ref: React.Ref<HTMLDivElement>
) {
  const { description, title, testId, type, ...other } = props;
  const firstTabRef = React.useRef<HTMLButtonElement>(null);
  const lastFocusedScatterPoint = React.useRef<SVGPathElement>(null);
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const [pointRefArray, registerPoint, unregisterPoint] = useDescendants();

  function handleChartTabKeydown(event: React.KeyboardEvent) {
    const { key, shiftKey } = event;
    switch (key) {
      case 'Tab': {
        if (
          !shiftKey &&
          lastFocusedScatterPoint &&
          lastFocusedScatterPoint.current &&
          pointRefArray.current.find(
            point => point.current === lastFocusedScatterPoint.current
          )
        ) {
          event.preventDefault();
          lastFocusedScatterPoint.current.focus();
        }
        break;
      }
    }
  }

  return (
    <div ref={ref}>
      <StyledTitle theme={theme}>{title}</StyledTitle>
      {description && (
        <StyledParagraph
          theme={theme}
          visualStyle={TypographyVisualStyle.bodySmall}
        >
          {description}
        </StyledParagraph>
      )}
      <StyledTabsContainer theme={theme}>
        <Tabs aria-label="Line Chart Demo">
          <Tab onKeyDown={handleChartTabKeydown} ref={firstTabRef}>
            {i18n.charts.line.chartTabLabel}
          </Tab>
          <Tab>{i18n.charts.line.dataTabLabel}</Tab>
        </Tabs>
        <TabPanelsContainer>
          <StyledTabPanel theme={theme}>
            {type === 'line' && (
              <LineChart<T>
                {...other}
                lastFocusedScatterPoint={lastFocusedScatterPoint}
                pointRefArray={pointRefArray}
                registerPoint={registerPoint}
                tabRef={firstTabRef}
                unregisterPoint={unregisterPoint}
              />
            )}
          </StyledTabPanel>
          <StyledTabPanel theme={theme}>
            <ChartDataTable
              data={other.data}
              xData={{
                keyValue: other.x,
                label: other.componentProps?.xAxis?.label,
                tickFormat: other.componentProps?.xAxis?.tickFormat,
              }}
              yData={{
                keyValue: other.y,
                tickFormat: other.componentProps?.yAxis?.tickFormat,
              }}
            />
          </StyledTabPanel>
        </TabPanelsContainer>
      </StyledTabsContainer>
    </div>
  );
}

export const Chart = React.forwardRef(BaseChart) as <T>(
  props: ChartProps<T> & { ref?: React.MutableRefObject<HTMLDivElement> }
) => ReturnType<typeof BaseChart>;
