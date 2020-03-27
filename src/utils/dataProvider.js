import { interval, of } from "rxjs";
import {
  withLatestFrom,
  auditTime,
  concatMap,
  delay,
  timeoutWith,
  repeat
} from "rxjs/operators";

const randomValBetween = (bottom, top) =>
  Math.floor(Math.random() * (1 + top - bottom)) + bottom;

const addDefaultToResurce = resource => {
  return resource.pipe(timeoutWith(1000, of("N/A"))).pipe(repeat(Infinity));
};

const temperatureResource = interval(100).pipe(
  concatMap(val =>
    of(randomValBetween(18, 39)).pipe(delay(randomValBetween(100, 2000)))
  )
);

const airPresureResource = interval(100).pipe(
  concatMap(val =>
    of(randomValBetween(980, 1015)).pipe(delay(randomValBetween(100, 2000)))
  )
);

const humidityResource = interval(100).pipe(
  concatMap(val =>
    of(randomValBetween(30, 70)).pipe(delay(randomValBetween(100, 2000)))
  )
);

// export default race(temperatureRes, interval(1000).pipe(mapTo("N/A")))

const tempResWithDef = addDefaultToResurce(temperatureResource);
const airPresResWithDef = addDefaultToResurce(airPresureResource);
const humidResWithDef = addDefaultToResurce(humidityResource);

export default tempResWithDef
  .pipe(
    withLatestFrom(
      airPresResWithDef,
      humidResWithDef,
      (temperature, pressure, humidity) => ({ temperature, pressure, humidity })
    )
  )
  .pipe(auditTime(100));
