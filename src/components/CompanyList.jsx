import { useRef, useCallback } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Typography,
  Box
} from "@mui/material";

const CompanyList = ({ companies, loading, error, loadMore, hasMore }) => {
  const observer = useRef();

  const lastCompanyRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Industry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company, index) => {
              if (companies.length === index + 1) {
                return (
                  <TableRow key={company.id} ref={lastCompanyRef}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow key={company.id}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.location}</TableCell>
                    <TableCell>{company.industry}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!hasMore && !loading && companies.length > 0 && (
        <Typography align="center" sx={{ mt: 2 }}>
          No more companies to load
        </Typography>
      )}
      {!loading && companies.length === 0 && (
        <Typography align="center" sx={{ mt: 2 }}>
          No companies found
        </Typography>
      )}
    </>
  );
};

export default CompanyList;