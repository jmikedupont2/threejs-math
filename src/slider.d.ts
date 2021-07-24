// Type definitions for react-range-step-input 1.3
// Project: https://github.com/nikolas/react-range-step-input#readme
// Definitions by: james miked dupont <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
import * as React from 'react';

interface MyProps {
    max: Number
}

export class RangeStepInput extends React.Component<MyProps, any> {
    constructor(t: any);
    makeHoldLoop(e: any): any;
    onInput(e: any): void;
    onMouseDown(): void;
    onMouseMove(): void;
    onMouseUp(): void;
    render(): any;
    props: MyProps;

    static defaultProps: {
        hold: boolean;
    };

}

export namespace RangeStepInput {
    namespace propTypes {
        function className(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function disabled(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function hold(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function id(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function max(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function min(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function name(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function onChange(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function step(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function style(e: any, t: any, r: any, o: any, u: any, i: any): void;
        function value(e: any, t: any, r: any, o: any, u: any, i: any): void;

        namespace className {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.className
            const isRequired: any;
        }

        namespace disabled {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.disabled
            const isRequired: any;
        }

        namespace hold {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.hold
            const isRequired: any;
        }
        namespace id {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.id
            const isRequired: any;
        }
        namespace max {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.max
            const isRequired: any;
        }
        namespace min {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.min
            const isRequired: any;
        }
        namespace name {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.name
            const isRequired: any;
        }
        namespace onChange {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.onChange
            const isRequired: any;
        }
        namespace step {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.step
            const isRequired: any;
        }
        namespace style {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.style
            const isRequired: any;
        }
        namespace value {
            // Circular reference from react_range_step_input.RangeStepInput.propTypes.value
            const isRequired: any;
        }
    }
}
