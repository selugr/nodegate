const routeMatch = require('../../workers/routeMatch');

const step = jest.fn();
const execute = jest.fn();

describe('workers/routeMatch', () => {
  beforeEach(() => {
    step.mockClear();
    execute.mockClear();
  });
  it('should correctly return a function', () => {
    expect(routeMatch()).toBeInstanceOf(Function);
  });
  it('should execute the workflow if the route match', () => {
    routeMatch(/\/captain*/, [step])(
      { body: { name: 'Kirk' } },
      { route: { path: '/captain/:name' } },
      execute,
    );
    expect(execute.mock.calls.length).toBe(1);
    expect(execute.mock.calls[0][0]).toEqual([step]);
  });
  it('should not execute the workflow if the route does not match', () => {
    routeMatch(/\/captain*/, [step])(
      { body: { name: 'Kirk' } },
      { route: { path: '/ship/:name' } },
      execute,
    );
    expect(execute.mock.calls.length).toBe(0);
  });
});

// test to perform
// const TYPES = [
//   'giftcard',
//   'boxes',
//   'single-voucher',
// ];

// const regex = new RegExp(`^.*/(${TYPES.join('|')})/.*$`);
// http://localhost:3100/purchase/use/boxes/9592bfd4-88c3-459f-992a-80c4d257395e
