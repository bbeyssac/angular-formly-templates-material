import template from './textarea.html';

export default (formlyConfigProvider) => {
    formlyConfigProvider.setType({
        name: 'textarea',
        template: template,
        wrapper: ['label', 'messages', 'inputContainer'],
        defaultOptions: {
            ngModelAttrs: {
                rows: {attribute: 'rows'},
                cols: {attribute: 'cols'}
            },
            templateOptions: {
              grow: true
            }
        },
        apiCheck: (check) => ({
            templateOptions: {
                rows: check.number.optional,
                cols: check.number.optional,
                grow: check.bool.optional
            }
        })
    });
}
