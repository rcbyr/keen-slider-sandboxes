import { Component } from "@angular/core"
import { format, subDays } from "date-fns"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  formatDate(idx) {
    return format(subDays(new Date(), idx), "iii d LLL")
  }
}
