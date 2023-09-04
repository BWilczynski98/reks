import dayjs from "dayjs"

var updateLocale = require("dayjs/plugin/updateLocale")
dayjs.extend(updateLocale)

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a dzień",
    dd: "%d dni",
    M: "a miesiąc",
    MM: "%d miesięcy",
    y: "a rok",
    yy: "%d lata",
  },
})
