'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { Hits, InstantSearch, PoweredBy, RefinementList, Pagination, Stats } from 'react-instantsearch';
import { SearchBox } from 'react-instantsearch';
import appconfig from '@/appconfig';
import SearchResult from './SearchResult';

export default function page() {
  console.log('appconfig....', appconfig);
  const appId = appconfig.algolia.appId;
  const apiKey = appconfig.algolia.apiKey;
  const indexName = appconfig.algolia.indexName;

  const searchClient = algoliasearch(appId, apiKey);

  return (
    <Container>
      <Box>
        <InstantSearch searchClient={searchClient} indexName={indexName} routing={true}>
          <SearchBox autoFocus />
          <Stats />
          <Pagination />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h5" color="text.secondary" component="div">
                Countries
              </Typography>
              <RefinementList attribute="country" showMore={true} showMoreLimit={250} />

              <Typography variant="h5" color="text.secondary" component="div" mt={2}>
                Currencies
              </Typography>
              <RefinementList attribute="currency" showMore={true} showMoreLimit={250} />

              <Typography variant="h5" color="text.secondary" component="div" mt={2}>
                Face Values
              </Typography>
              <RefinementList attribute="pretty_face_value" title="Face Values" showMore={true} showMoreLimit={250} />

              <Typography variant="h5" color="text.secondary" component="div" mt={2}>
                Series
              </Typography>
              <RefinementList attribute="series_or_theme_name" title="Series" showMore={true} showMoreLimit={250} />

              <Typography variant="h5" color="text.secondary" component="div" mt={2}>
                Shapes
              </Typography>
              <RefinementList attribute="shape" title="Shapes" showMore={true} showMoreLimit={250} />
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <Hits hitComponent={({ hit }) => <SearchResult props={hit} />} />
            </Grid>
          </Grid>
          <Pagination />
          <hr />
          <PoweredBy />
        </InstantSearch>
      </Box>
    </Container>
  );
}
