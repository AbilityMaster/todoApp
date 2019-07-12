import {transformId} from "../utils/utils";

export function getSelectedDays(config: any) {
    const selectedDays = [];

   for (let i = 0; i < config.length; i++) {
       selectedDays.push(transformId(config[i].id));
   }

   return selectedDays;
}