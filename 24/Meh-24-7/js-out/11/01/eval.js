import { Exist, Leaf, ef, log, util } from "../../meh/index.js";
export const Eval = (com) => {
    const self = new Exist(com);
    // log( util.df1( "{hh}" ) );
    util.df2;
    // const code = "util.df1( '{YYYY}/{MM}/{DD} {hh}:{mm}:{ss}' )";
    const code = "const d = util.df2();\n`${ d.YYYY }/${ d.MM }/${ d.DD } ${ d.B } ${ d.hh }:${ d.mm}: ${ d.ss }`";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy8xMS8wMS9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdEUsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUUsR0FBVyxFQUFHLEVBQUU7SUFFckMsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUM7SUFFOUIsNkJBQTZCO0lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUM7SUFFVCxnRUFBZ0U7SUFDaEUsTUFBTSxJQUFJLEdBQUcsaUdBQWlHLENBQUM7SUFFL0csTUFBTSxHQUFHLEdBQ1Q7UUFDQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxJQUFJLENBQUU7UUFDbkMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsU0FBUyxDQUFFO1FBQzFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBRTtLQUN2QyxDQUFDO0lBRUYsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQjtRQUNDLEtBQUssRUFDTDtZQUNDLE9BQU8sRUFBRSxNQUFNO1lBQ2YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsS0FBSyxFQUFFLEtBQUs7WUFDWixHQUFHLEVBQUUsS0FBSztTQUNWO0tBQ0QsRUFFRCxFQUFFLENBQUMsRUFBRSxDQUFFLE1BQU0sQ0FBRSxFQUVmLEVBQUUsQ0FBQyxPQUFPLENBRVQsRUFBRSxDQUFDLE1BQU0sQ0FFUjtRQUNDLElBQUksRUFDSjtZQUNDLEtBQUssRUFBRSxDQUFFLEVBQUUsRUFBRyxFQUFFO2dCQUVmLElBQUk7b0JBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUE7aUJBQUU7Z0JBQ2pELE9BQU8sR0FBRyxFQUFHO29CQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBRSxHQUFhLENBQUUsQ0FBQztpQkFBRTtnQkFDNUQsR0FBRyxDQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUUsQ0FBQTtZQUNsQixDQUFDO1NBQ0Q7S0FDRCxFQUNELE1BQU0sQ0FDTixDQUNELEVBRUQsUUFBUSxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUUsRUFDcEIsUUFBUSxDQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUUsRUFDdEIsUUFBUSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FDckIsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHLENBQUUsS0FBa0IsRUFBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FFckQ7SUFDQyxLQUFLLEVBQ0w7UUFDQyxPQUFPLEVBQUUsT0FBTztRQUNoQixNQUFNLEVBQUUsS0FBSztRQUNiLGVBQWUsRUFBRSxtQkFBbUI7UUFDcEMsS0FBSyxFQUFFLG1CQUFtQjtRQUMxQixVQUFVLEVBQUUsU0FBUztRQUNyQixRQUFRLEVBQUUsU0FBUztLQUNuQjtJQUNELEtBQUssRUFDTDtRQUNDLEtBQUs7S0FDTDtJQUNELElBQUksRUFDSjtRQUNDLE1BQU0sQ0FBRSxFQUFFO1lBRVQsSUFBSSxFQUFFLENBQUMsTUFBTSxZQUFZLG1CQUFtQixFQUM1QztnQkFDQyxLQUFLLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLENBQUM7YUFDN0I7UUFDRixDQUFDO0tBQ0Q7Q0FDRCxDQUNELENBQUMifQ==