import { Pagination, PaginationItem } from "@mui/material";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { Colors } from "theme/Colors";

interface Props {
  count: number; // total pages
  page: number;
  setPage: CallableFunction;
}
export default function CustomPagination({ count, page, setPage }: Props) {
  return (
    <Pagination
      showFirstButton
      showLastButton
      count={count}
      page={page}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            first: (props) => <IconChevronsLeft {...props} size={18} />,
            last: (props) => <IconChevronsRight {...props} size={18} />,
          }}
          sx={{
            backgroundColor: Colors.grey[100],
            border: "none",
            "&:hover": {
              backgroundColor: `${Colors.primary[500]}16`,
              color: Colors.primary[500],
            },
            "&.Mui-selected": {
              backgroundColor: `${Colors.primary[500]}16`,
              color: Colors.primary[500],
              border: "none",
            },
          }}
          {...item}
        />
      )}
      shape="rounded"
      variant="outlined"
      onChange={(_, value) => setPage(value)}
    />
  );
}
