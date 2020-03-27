import { of } from "rxjs";
import {
  delay,
} from "rxjs/operators";

export default of({ temperature: 22, pressure: 1000, humidity: 45 })
.pipe(delay(100));
