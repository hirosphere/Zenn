import pokemon from "./pokemon.js";
import move from "./move.js";
import item from "./item.js";
import location from "./location.js";
export const itemMap = new Map([
    ...sortById(Object.values(pokemon).map((pokemon) => [`p${pokemon.id}`, pokemon])),
    ...sortById(Object.values(move).map((move) => [`m${move.id}`, move])),
    ...sortById(Object.values(item).map((item) => [`i${item.id}`, item])),
    ...sortById(Object.values(location).map((item) => [`l${item.id}`, item])),
]);
function sortById(arr) {
    return arr.sort((a, b) => {
        return a[1].id - b[1].id;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvMTEvcG9rZS1zZWFyY2gvZGF0YS9pdGVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxjQUFjLENBQUM7QUFDbkMsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBQzdCLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUM3QixPQUFPLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFRckMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFlO0lBQzNDLEdBQUcsUUFBUSxDQUNULE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQ3JFO0lBQ0QsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDMUUsQ0FBQyxDQUFDO0FBRUgsU0FBUyxRQUFRLENBQ2YsR0FBZ0M7SUFFaEMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9