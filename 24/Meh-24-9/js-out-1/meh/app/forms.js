import { leaf, ef } from "../index.js";
/*
    spa
    container_switch

    select > option
    radio_group
    range

*/
/* */
export var model;
(function (model) {
    /* Select > Option */
    class Select {
        ksel;
        constructor(ksel) {
            this.ksel = ksel;
        }
        options = new Map;
        add_option(el, key) {
            this.options.set(el, key);
        }
        remove_option(el) {
            this.options.delete(el);
        }
    }
    class RadioGroup {
        ;
    }
})(model || (model = {}));
/* */
export function input(m, ec = {}) {
    return ef.input(input_ec(m, ec));
}
export function textarea(m, ec = {}) {
    return ef.textarea(textarea_ec(m, ec));
}
function input_ec(m, ec) {
    return ec =
        {
            props: {
                value: m,
                ...(ec?.props ?? {})
            },
            acts: {
                ...(ec?.acts ?? {}),
                input(ev) {
                    if (ev.target instanceof HTMLInputElement) {
                        m.value = ev.target.value;
                    }
                }
            }
        };
}
function textarea_ec(m, ec) {
    return ec =
        {
            props: {
                value: m,
                ...(ec?.props ?? {})
            },
            acts: {
                ...(ec?.acts ?? {}),
                input(ev) {
                    if (ev.target instanceof HTMLTextAreaElement) {
                        m.value = ev.target.value;
                    }
                }
            }
        };
}
export function range(m) {
    const ec = {};
    ec.attrs =
        {
            type: "range",
            autocomplete: "off",
            min: leaf.mk_str(m.min ?? 0),
            step: leaf.mk_str(m.step ?? 1),
            max: leaf.mk_str(m.max ?? 100),
        };
    ec.props =
        {
            value: m.value.mk_str(),
        };
    ec.acts =
        {
            input(ev) {
                if (!(ev.target instanceof HTMLInputElement))
                    return;
                m.value.value = Number(ev.target.value);
            }
        };
    return ef.section({ class: "Range range" }, ef.label({ class: "title" }, m.title), ef.input(ec), ef.span({ class: "value-unit" }, ef.span({ class: "value" }, m.value.mk_str(m.to_lv)), ef.span({ class: "unit" }, m.unit)));
}
/* */
/* */
let next_ru_ctr = 1;
export const next_ru = () => String("ru-" + (next_ru_ctr++));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2FwcC9mb3Jtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUU7QUFHdkQ7Ozs7Ozs7O0VBUUU7QUFHRixLQUFLO0FBRUwsTUFBTSxLQUFXLEtBQUssQ0ErQ3JCO0FBL0NELFdBQWlCLEtBQUs7SUFFckIscUJBQXFCO0lBRXJCLE1BQU0sTUFBTTtRQUlNO1FBRmpCLFlBRWlCLElBQWlCO1lBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7UUFFakMsQ0FBQztRQUVRLE9BQU8sR0FBRyxJQUFJLEdBQW1CLENBQUU7UUFFdEMsVUFBVSxDQUFHLEVBQVksRUFBRyxHQUFPO1lBRXpDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFHLEVBQUUsRUFBRyxHQUFHLENBQUUsQ0FBQztRQUMvQixDQUFDO1FBRU0sYUFBYSxDQUFHLEVBQVk7WUFFbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUcsRUFBRSxDQUFFLENBQUU7UUFDN0IsQ0FBQztLQUNEO0lBb0JELE1BQU0sVUFBVTtRQUVmLENBQUM7S0FDRDtBQUNGLENBQUMsRUEvQ2dCLEtBQUssS0FBTCxLQUFLLFFBK0NyQjtBQUdELEtBQUs7QUFFTCxNQUFNLFVBQVUsS0FBSyxDQUFHLENBQVksRUFBRyxLQUFvQyxFQUFFO0lBRTVFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBRyxRQUFRLENBQUcsQ0FBQyxFQUFHLEVBQUUsQ0FBRyxDQUFFLENBQUE7QUFDekMsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUcsQ0FBWSxFQUFHLEtBQXVDLEVBQUU7SUFFbEYsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFHLFdBQVcsQ0FBRyxDQUFDLEVBQUcsRUFBRSxDQUFFLENBQUUsQ0FBQTtBQUM5QyxDQUFDO0FBRUQsU0FBUyxRQUFR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