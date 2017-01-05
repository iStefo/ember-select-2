import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  text: faker.list.cycle(
    "Margherita",
    "Peperoni",
    "Ham",
    "Hawaii"
  )
});
