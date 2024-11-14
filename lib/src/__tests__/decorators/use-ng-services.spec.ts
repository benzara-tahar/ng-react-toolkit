import { renderHook } from '@testing-library/react';
import { element } from 'angular';
import { useNgServices } from '../../hooks/use-ng-services';


// Mock angular element function
jest.mock('angular', () => ({
  element: jest.fn()
}));

describe('useNgServices', () => {
  // Mock injector setup
  const mockInjector = {
    has: jest.fn(),
    get: jest.fn()
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock responses
    mockInjector.has.mockReturnValue(true);
    mockInjector.get.mockImplementation((serviceName) => {
      const mockServices: Record<string, any> = {
        '$scope': { $apply: jest.fn() },
        'UserService': { getUser: jest.fn() }
      };
      return mockServices[serviceName];
    });

    // Mock the element().injector() chain
    (element as jest.Mock).mockReturnValue({
      injector: () => mockInjector
    });

    // Clear any existing window._injector
    delete window._injector;
  });

  it('should retrieve services from injector', () => {
    const { result } = renderHook(() => useNgServices('$scope', 'UserService'));

    expect(result.current).toHaveProperty('$scope');
    expect(result.current).toHaveProperty('userService');
    expect(mockInjector.get).toHaveBeenCalledWith('$scope');
    expect(mockInjector.get).toHaveBeenCalledWith('UserService');
  });

  it('should use window._injector if available', () => {
    const windowInjector = {
      has: jest.fn().mockReturnValue(true),
      get: jest.fn().mockReturnValue({ windowService: true })
    };
    window._injector = windowInjector as any;

    const { result } = renderHook(() => useNgServices('TestService'));

    expect(windowInjector.get).toHaveBeenCalledWith('TestService');
    expect(element).not.toHaveBeenCalled();
  });

  it('should throw error if injector is not found', () => {
    (element as jest.Mock).mockReturnValue({
      injector: () => null
    });

    expect(() => {
      renderHook(() => useNgServices('$scope'));
    }).toThrow('injector not found');
  });

  it('should throw error if service is not found in injector', () => {
    mockInjector.has.mockReturnValue(false);

    expect(() => {
      renderHook(() => useNgServices('NonExistentService'));
    }).toThrow('service NonExistentService not found');
  });

  it('should convert service names to camelCase in result', () => {
    mockInjector.get.mockReturnValue({ testMethod: jest.fn() });

    const { result } = renderHook(() => 
      useNgServices('UserService', 'AuthService', 'API_Service')
    );

    expect(result.current).toHaveProperty('userService');
    expect(result.current).toHaveProperty('authService');
    expect(result.current).toHaveProperty('aPI_Service');
  });

  it('should memoize the result', () => {
    const { result, rerender } = renderHook(() => 
      useNgServices('$scope')
    );

    const firstResult = result.current;
    rerender();
    expect(result.current).toBe(firstResult);
    expect(mockInjector.get).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple services with correct types', () => {
    const mockScope = { $apply: jest.fn() };
    const mockUserService = { getUser: jest.fn() };
    
    mockInjector.get.mockImplementation((serviceName) => {
      const services:Record<string, any> = {
        '$scope': mockScope,
        'UserService': mockUserService
      };
      return services[serviceName];
    });

    const { result } = renderHook(() => 
      useNgServices('$scope', 'UserService')
    );

    expect(result.current.$scope).toBe(mockScope);
    expect(result.current.userService).toBe(mockUserService);
  });
});