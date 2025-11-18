import React from "react";
import {
  TextField,
  Button,
  Box,
  Grid
} from "@mui/material";
import MultiSelectFilter from "./MultiSelectFilter";

const Filters = ({ filters, setFilters, locations, industries, onClear }) => {
  const hasActiveFilters =
    filters.name.trim() !== "" ||
    filters.location.length > 0 ||
    filters.industry.length > 0;

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={filters.name}
          onChange={e =>
            setFilters({ ...filters, name: e.target.value })
          }
          fullWidth
        />
        <MultiSelectFilter
          label="Select Location(s)"
          placeholder="Select Location(s)"
          options={locations}
          value={filters.location}
          onChange={(e, v) =>
            setFilters({ ...filters, location: v })
          }
        />
        <MultiSelectFilter
          label="Select Industry(s)"
          placeholder="Select Industry(s)"
          options={industries}
          value={filters.industry}
          onChange={(e, v) =>
            setFilters({ ...filters, industry: v })
          }
        />
        {hasActiveFilters && (
          <Grid item xs={12} md={12} sx={{ textAlign: { xs: "left", md: "right" }, mt: { xs: 2, md: 0 } }}>
            <Button variant="outlined" color="secondary" onClick={onClear}>
              Clear All Filters
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Filters;