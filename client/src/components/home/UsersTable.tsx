import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

type Props = {
  users: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string | null;
    phone_number: string | null;
  }[];
};

const UsersTable = ({ users }: Props) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell align="right">Email</TableHeaderCell>
          <TableHeaderCell align="right">Date of Birth</TableHeaderCell>
          <TableHeaderCell align="right">Phone Number</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {`${user.first_name} ${user.last_name}`}
            </TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.date_of_birth ?? "N/A"}</TableCell>
            <TableCell align="right">{user.phone_number ?? "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UsersTable;
