/* eslint-disable prettier/prettier */
import { polygon, point, booleanPointInPolygon } from '@turf/turf';
import { Position } from 'geojson';
type Driver = {
  lat: number;
  lng: number;
}
class AppUtils {

  private deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };
  public properEmail = (email: string): string => {
    return email.toLowerCase();
  };
  public calcPrice = (location1: Position, location2: Position): string => {
    const point1 = point(location1);
    const point2 = point(location2);
    const areaPolygon = polygon([
      [
        [7.7470547, 5.1558756],
        [7.6392513, 5.1271525],
        [7.746368, 5.0313997],
        [7.8946835, 4.9876222],
        [8.038879, 5.0245596],
        [8.0162197, 5.136727],
        [7.7470547, 5.1558756]
      ]
    ]);
    const point1IsWithinArea = booleanPointInPolygon(point1, areaPolygon);
    const point2IsWithinArea = booleanPointInPolygon(point2, areaPolygon);
    if (point1IsWithinArea && point2IsWithinArea) {
      return '1000';
    }
    return '';
  };
  public getDistanceFromLatLonInKm = (
    pos1: { lat1: number; lon1: number },
    pos2: { lat2: number; lon2: number }
  ): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(pos2.lat2 - pos1.lat1); // Difference in latitude
    const dLon = this.deg2rad(pos2.lon2 - pos1.lon1); // Difference in longitude
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(pos1.lat1)) *
      Math.cos(this.deg2rad(pos2.lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };
  public findClosestDrivers =
  (driversOnline: Driver[],
    user: {lat: number, lng: number}): void | number => {
    driversOnline.forEach((x) => {
      if (
        this.getDistanceFromLatLonInKm(
            { lat1: user.lat, lon1: user.lng },
            { lat2: x.lat, lon2: x.lng }) <=
        5
      ) {
        return x
      }else {
        return null
      }
    });
  }
}

export default AppUtils;
