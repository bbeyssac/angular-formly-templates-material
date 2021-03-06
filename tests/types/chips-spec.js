import testUtils from './../test-utils';
import angular from 'angular';

describe('formlyMaterial - chips type', () => {
  //
  // vars
  //
  let $compile;
  let $rootScope;
  let $scope;
  let element;
  let field;

  function onAdd() {
    return true;
  }

  function onRemove() {
    return true;
  }

  function onSelect() {
    return true;
  }
  //
  // helpers
  //

  function compile(options) {
    $scope = $rootScope.$new();
    $scope.fields = [angular.merge({}, {
      key: 'testField',
      type: 'chips',
      templateOptions: {
        onAdd,
        onRemove,
        onSelect,
        label: 'test field',
        placeholder: '+tags',
        secondaryPlaceholder: 'Add tag',
        deleteButtonLabel: 'Remove',
        deleteHint: 'Remove tag'
      }
    }, options)];

    const form = $compile(testUtils.getFormTemplate())($scope);

    $scope.$digest();
    field = $scope.fields[0];
    element = form.find('[ng-model]');
  }

  //
  // tests
  //

  beforeEach(() => {
    window.module('formlyMaterial');

    inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

    compile();
  });

  it('should be md-chips element', () => {
    expect(element[0].nodeName).toBe('MD-CHIPS');
  });

  it('should have placeholder', () => {
    expect(element.attr('placeholder')).toBe(field.templateOptions.placeholder);
  });

  it('should have secondary placeholder', () => {
    expect(element.attr('secondary-placeholder')).toBe(field.templateOptions.secondaryPlaceholder);
  });

  it('should have delete button label', () => {
    expect(element.attr('delete-button-label')).toBe(field.templateOptions.deleteButtonLabel);
  });

  it('should have delete hint', () => {
    expect(element.attr('delete-hint')).toBe(field.templateOptions.deleteHint);
  });

  it('should have onAdd callback', () => {
    const scope = angular.element(element).scope();

    expect(element.attr('md-on-add')).toBe(`options.templateOptions['onAdd']`);
    expect(scope.options.templateOptions.onAdd).toBe(onAdd);
  });

  it('should have onRemove callback', () => {
    const scope = angular.element(element).scope();

    expect(element.attr('md-on-remove')).toBe(`options.templateOptions['onRemove']`);
    expect(scope.options.templateOptions.onRemove).toBe(onRemove);
  });

  it('should have onSelect callback', () => {
    const scope = angular.element(element).scope();

    expect(element.attr('md-on-select')).toBe(`options.templateOptions['onSelect']`);
    expect(scope.options.templateOptions.onSelect).toBe(onSelect);
  });
});
