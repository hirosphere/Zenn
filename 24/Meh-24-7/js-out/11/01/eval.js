import { Exist, Leaf, ef, log, util } from "../../meh/index.js";
export const Eval = (com) => {
    const self = new Exist(com);
    // log( util.df1( "{hh}" ) );
    util.df2;
    // const code = "util.df1( '{YYYY}/{MM}/{DD} {hh}:{mm}:{ss}' )";
    const code = "const d = util.df2();\n`${ d.YYYY }/${ d.MM }/${ d.DD } ${ d.B } ${ d.hh }:${ d.mm}:${ d.ss }`";
    const doc = {
        code: new Leaf.String(self, code),
        output: new Leaf.String(self, "Output "),
        input: new Leaf.String(self, "Input"),
    };
    return ef.article({
        style: {
            display: "flex",
            flexFlow: "column",
            width: "50%",
            gap: "1px",
        }
    }, ef.h2("Eval"), ef.section(ef.button({
        acts: {
            click: (ev) => {
                try {
                    doc.output.value = eval(doc.code.value);
                }
                catch (err) {
                    doc.output.value = String(err);
                }
                log(ev.clientX);
            },
        }
    }, "Eval")), textarea(doc.code), textarea(doc.output), textarea(doc.input));
};
const textarea = (value) => ef.textarea({
    style: {
        display: "block",
        height: "6em",
        backgroundColor: "hsl( 0, 0%, 20% )",
        color: "hsl( 0, 0%, 90% )",
        fontFamily: "courier",
        fontSize: "0.94rem",
    },
    props: {
        value
    },
    acts: {
        change(ev) {
            if (ev.target instanceof HTMLTextAreaElement) {
                value.set(ev.target.value);
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy8xMS8wMS9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdEUsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUUsR0FBVyxFQUFHLEVBQUU7SUFFckMsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUM7SUFFOUIsNkJBQTZCO0lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUM7SUFFVCxnRUFBZ0U7SUFDaEUsTUFBTSxJQUFJLEdBQUcsZ0dBQWdHLENBQUM7SUFFOUcsTUFBTSxHQUFHLEdBQ1Q7UUFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxJQUFJLENBQUU7UUFDbkMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsU0FBUyxDQUFFO1FBQzFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBRTtLQUN2QyxDQUFDO0lBRUYsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQjtRQUNDLEtBQUssRUFDTDtZQUNDLE9BQU8sRUFBRSxNQUFNO1lBQ2YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsS0FBSyxFQUFFLEtBQUs7WUFDWixHQUFHLEVBQUUsS0FBSztTQUNWO0tBQ0QsRUFFRCxFQUFFLENBQUMsRUFBRSxDQUFFLE1BQU0sQ0FBRSxFQUVmLEVBQUUsQ0FBQyxPQUFPLENBRVQsRUFBRSxDQUFDLE1BQU0sQ0FFUjtRQUNDLElBQUksRUFDSjtZQUNDLEtBQUssRUFBRSxDQUFFLEVBQUUsRUFBRyxFQUFFO2dCQUVmLElBQUksQ0FBQztvQkFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQTtnQkFBQyxDQUFDO2dCQUNqRCxPQUFPLEdBQUcsRUFBRyxDQUFDO29CQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBRSxHQUFhLENBQUUsQ0FBQztnQkFBQyxDQUFDO2dCQUM1RCxHQUFHLENBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBRSxDQUFBO1lBQ2xCLENBQUM7U0FDRDtLQUNELEVBQ0QsTUFBTSxDQUNOLENBQ0QsRUFFRCxRQUFRLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxFQUNwQixRQUFRLENBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBRSxFQUN0QixRQUFRLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBRSxDQUNyQixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBRSxLQUFrQixFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUVyRDtJQUNDLEtBQUssRUFDTDtRQUNDLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLE1BQU0sRUFBRSxLQUFLO1FBQ2IsZUFBZSxFQUFFLG1CQUFtQjtRQUNwQyxLQUFLLEVBQUUsbUJBQW1CO1FBQzFCLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLFFBQVEsRUFBRSxTQUFTO0tBQ25CO0lBQ0QsS0FBSyxFQUNMO1FBQ0MsS0FBSztLQUNMO0lBQ0QsSUFBSSxFQUNKO1FBQ0MsTUFBTSxDQUFFLEVBQUU7WUFFVCxJQUFJLEVBQUUsQ0FBQyxNQUFNLFlBQVksbUJBQW1CLEVBQzVDLENBQUM7Z0JBQ0EsS0FBSyxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFDO1lBQzlCLENBQUM7UUFDRixDQUFDO0tBQ0Q7Q0FDRCxDQUNELENBQUMifQ==