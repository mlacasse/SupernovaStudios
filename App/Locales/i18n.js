//
//  i18n.js
//  SupernovaStudios
//
//  Created by Neha.
//  Copyright © 2018 You.i. All rights reserved.
//

import I18n from "react-native-i18n"
import en from "./en.json"

I18n.fallbacks = true

I18n.translations = { en }

export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;
