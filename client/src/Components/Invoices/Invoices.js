import {
  NavLink,
  Outlet,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { getInvoices } from "./data.js";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  function QueryNavLink({ to, ...props }) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
  }

  return (
    <div className="invoices">
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => ({
                display: "block",
                marginLeft: "50%",
                color: isActive ? "red" : "",
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
