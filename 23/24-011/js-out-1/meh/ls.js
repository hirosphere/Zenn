const log = console.log;
function Item(name) {
    function X() { }
    return (msg, fn) => {
        fn([name, msg, "**************"]);
    };
}
const item = Item("ls-quest");
item("new", s => log(...s));
/* */
export const _ls = {
    s: true,
    model: {
        s: true,
        exist: {
            s: true,
            life: { s: false },
            src: { s: false },
            ref: { s: false },
        },
    },
    dom: {
        s: true,
        nodet: { s: true,
            life: { s: true },
            val: { s: true },
            evh: { s: false },
        },
        parts: { s: false,
            reader: { s: false },
            each: { s: false },
        },
    }
};
const rel = (node, path, com_state) => {
    node.s &&= com_state;
    // console.log( "ls", path.join( "." ), node.s )
    for (const [name, part] of Object.entries(node)) {
        if (typeof part == "boolean")
            continue;
        rel(part, [...path, name], node.s && part.s);
    }
};
rel(_ls, [], true);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvbWVoL2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsU0FBUyxJQUFJLENBQUUsSUFBYTtJQUUzQixTQUFTLENBQUMsS0FBSSxDQUFDO0lBRWYsT0FBTyxDQUFFLEdBQVksRUFBRSxFQUE4QixFQUFHLEVBQUU7UUFFekQsRUFBRSxDQUFFLENBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBRSxDQUFFLENBQUM7SUFDdkMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBRSxVQUFVLENBQUUsQ0FBQztBQUVoQyxJQUFJLENBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFFLEdBQUksQ0FBQyxDQUFFLENBQUUsQ0FBQztBQUtqQyxLQUFLO0FBRUwsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUNoQjtJQUNDLENBQUMsRUFBRSxJQUFJO0lBQ1AsS0FBSyxFQUFDO1FBQ0wsQ0FBQyxFQUFFLElBQUk7UUFDUCxLQUFLLEVBQUM7WUFDTCxDQUFDLEVBQUUsSUFBSTtZQUNQLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7WUFDbEIsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtZQUNqQixHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO1NBQ2pCO0tBQ0Q7SUFDRCxHQUFHLEVBQUU7UUFDSixDQUFDLEVBQUUsSUFBSTtRQUNQLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRTtZQUNqQixHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFO1lBQ2hCLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7U0FDakI7UUFDRCxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSztZQUNoQixNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7U0FDbEI7S0FDRDtDQUNELENBQUM7QUFVRixNQUFNLEdBQUcsR0FBRyxDQUFFLElBQVcsRUFBRSxJQUFnQixFQUFFLFNBQW1CLEVBQUcsRUFBRTtJQUVwRSxJQUFJLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQztJQUVyQixnREFBZ0Q7SUFFaEQsS0FBSyxNQUFNLENBQUUsSUFBSSxFQUFFLElBQUksQ0FBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFFLEVBQ25EO1FBQ0MsSUFBSSxPQUFPLElBQUksSUFBSSxTQUFTO1lBQUcsU0FBUztRQUN4QyxHQUFHLENBQUUsSUFBSSxFQUFFLENBQUUsR0FBSSxJQUFJLEVBQUUsSUFBSSxDQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUM7S0FDbEQ7QUFDRixDQUFDLENBQUE7QUFFRCxHQUFHLENBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUUsQ0FBQyJ9