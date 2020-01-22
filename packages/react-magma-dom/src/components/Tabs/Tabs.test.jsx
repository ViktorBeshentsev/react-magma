import React from 'react';
import { Tabs } from './Tabs';
import { TabsContext } from './TabsContainer';
import { render, fireEvent } from '@testing-library/react';
const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Tabs', () => {
  it('should correctly apply the testId', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };
    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <button aria-label="test" data-testid="1" />
        </Tabs>
      </TabsContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';
    const buttonText = 'Click me';
    const { getByText } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <button aria-label="test" data-testid="1">
            {buttonText}
          </button>
        </Tabs>
      </TabsContext.Provider>
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('should require orientation the tabs', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';

    const { getByTestId, rerender } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId} orientation="horizontal"></Tabs>
      </TabsContext.Provider>
    );
    const component = getByTestId(testId);
    expect(component).toHaveAttribute('orientation', 'horizontal');

    rerender(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId} orientation="vertical"></Tabs>
      </TabsContext.Provider>
    );

    expect(component).toHaveAttribute('orientation', 'vertical');
  });

  it('TabsContextProvider/TabsContextConsumer shows activeTabIndex', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <TabsContext.Consumer>
          {value => (
            <div data-testid={testId}>{value.state.activeTabIndex}</div>
          )}
        </TabsContext.Consumer>
      </TabsContext.Provider>
    );
    expect(getByTestId(testId).textContent).toBe('1');
  });

  it('TabsContextProvider/TabsContextConsumer shows numberOfIndex', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <TabsContext.Consumer>
          {value => <div data-testid={testId}>{value.state.numberOfTabs}</div>}
        </TabsContext.Consumer>
      </TabsContext.Provider>
    );
    expect(getByTestId(testId).textContent).toBe('5');
  });

  it('should render children', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <div data-testid="child" />
        </Tabs>
      </TabsContext.Provider>
    );
    expect(getByTestId(testId).children.length).toBe(1);
    expect(getByTestId('child')).toBeDefined();
  });

  it('should render scroll buttons if orientation horizontal', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs
          testId={testId}
          hasScrollButtons={true}
          orientation="horizontal"
        />
      </TabsContext.Provider>
    );
    expect(getByTestId('buttonNext')).toBeDefined();
    expect(getByTestId('buttonPrev')).toBeDefined();
  });

  it('calls scrollIntoView on click by arrow button ', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const scrollIntoViewMock = jest.fn();

    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const { getByTestId } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={'dd'} hasScrollButtons={true} orientation="horizontal">
          <div>Test</div>
        </Tabs>
      </TabsContext.Provider>
    );

    fireEvent.click(getByTestId('buttonNext'));

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  // it('should render line bottom/top if orientation horizontal', () => {
  //   const dispatch = jest.fn();
  //   const state = {
  //     activeTabIndex: 1,
  //     numberOfTabs: 5
  //   };

  //   const testId = 'test-id';

  //   const { getByTestId, rerender } = render(
  //     <TabsContext.Provider value={{ state, dispatch }}>
  //       <Tabs testId={testId} borderPosition="top" orientation="horizontal">
  //         <div></div>
  //       </Tabs>
  //     </TabsContext.Provider>
  //   );
  //   expect(getByTestId('bottom-line')).toBeDefined();
  //   expect(getByTestId('bottom-line')).toHaveStyleRule('top', '0');

  //   rerender(
  //     <TabsContext.Provider value={{ state, dispatch }}>
  //       <Tabs testId={testId} borderPosition="bottom" orientation="horizontal">
  //         <div></div>
  //       </Tabs>
  //     </TabsContext.Provider>
  //   );

  //   expect(getByTestId('bottom-line')).toBeDefined();
  //   expect(getByTestId('bottom-line')).toHaveStyleRule('bottom', '0');
  // });

  // it('should render line left if orientation vertical', () => {
  //   const dispatch = jest.fn();
  //   const state = {
  //     activeTabIndex: 1,
  //     numberOfTabs: 5
  //   };

  //   const testId = 'test-id';

  //   const { getByTestId } = render(
  //     <TabsContext.Provider value={{ state, dispatch }}>
  //       <Tabs testId={testId} borderPosition="left" orientation="vertical">
  //         <div></div>
  //       </Tabs>
  //     </TabsContext.Provider>
  //   );
  //   expect(getByTestId('bottom-line')).toBeDefined();
  //   expect(getByTestId('bottom-line')).toHaveStyleRule('left', '0');
  // });
});

describe('Test for accessibility', () => {
  it('Does not violate accessibility standards', () => {
    const dispatch = jest.fn();
    const state = {
      activeTabIndex: 1,
      numberOfTabs: 5
    };

    const testId = 'test-id';

    const { container } = render(
      <TabsContext.Provider value={{ state, dispatch }}>
        <Tabs testId={testId}>
          <button aria-label="test" data-testid="1" />
        </Tabs>
      </TabsContext.Provider>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
