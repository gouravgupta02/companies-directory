import React, { useState, useEffect, useMemo } from "react";
import { Container, Typography, Box } from "@mui/material";
import Filters from "./components/Filters";
import CompanyList from "./components/CompanyList";
import companiesData from "./data/companies.json";

const PAGE_SIZE = 5;

const App = () => {
  const [filters, setFilters] = useState({ name: "", location: [], industry: [] });
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [visibleCompanies, setVisibleCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Memoized, sorted lists for dropdowns (more UX polish!)
  const locations = useMemo(() =>
    [...new Set(companiesData.map((c) => c.location))].sort()
  , []);
  const industries = useMemo(() =>
    [...new Set(companiesData.map((c) => c.industry))].sort()
  , []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const filtered = companiesData.filter((company) => {
        const matchesName = company.name.toLowerCase().includes(filters.name.toLowerCase());
        const matchesLocation =
          filters.location.length === 0 || filters.location.includes(company.location);
        const matchesIndustry =
          filters.industry.length === 0 || filters.industry.includes(company.industry);

        return matchesName && matchesLocation && matchesIndustry;
      });
      setFilteredCompanies(filtered);
      setPage(1);
      setVisibleCompanies(filtered.slice(0, PAGE_SIZE));
      setLoading(false);
    } catch {
      setError("Failed to filter companies");
      setLoading(false);
    }
  }, [filters]);

  const loadMore = () => {
    if (loading) return;
    const nextPage = page + 1;
    const nextCompanies = filteredCompanies.slice(0, nextPage * PAGE_SIZE);
    setVisibleCompanies(nextCompanies);
    setPage(nextPage);
  };

  const hasMore = visibleCompanies.length < filteredCompanies.length;

  const handleClearFilters = () => {
    setFilters({ name: "", location: [], industry: [] });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 4 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#fafbfc",
        borderRadius: 2,
        boxShadow: { sm: 2, md: 4 }
      }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        gutterBottom
        sx={{ letterSpacing: "1px", mt: { xs: 2, sm: 4 } }}
      >
        Companies Directory
      </Typography>

      {/* Filters with extra margin and shadow for clear separation */}
      <Box sx={{ width: '100%', maxWidth: 700, mx: "auto" }}>
        <Filters
          filters={filters}
          setFilters={setFilters}
          locations={locations}
          industries={industries}
          onClear={handleClearFilters}
        />
      </Box>

      {/* Total results count left-aligned, readable and not cluttered */}
      <Box sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        mb: 2,
        px: 2,
        display: "flex",
        alignItems: "center"
      }}>
        <Typography variant="subtitle1" color="text.secondary">
          Total results: {filteredCompanies.length}
        </Typography>
      </Box>

      {/* Company list */}
      <Box sx={{ width: '100%', maxWidth: 700, mx: "auto" }}>
        <CompanyList
          companies={visibleCompanies}
          loading={loading}
          error={error}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </Box>
    </Container>
  );
};

export default App;