import { getMintList } from '@/http/mint';
import {
  Container,
  Box,
  Typography,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from '@mui/material';
import { mint as MintType } from '@prisma/client';
import moment from 'moment';
import React from 'react';

export default async function page() {
  const mints: MintType[] = await getMintList();

  return (
    <Container>
      <Box>
        <Typography variant="body2" gutterBottom>
          <Link href="../">&lt;&lt;&lt; Go Back</Link>
        </Typography>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Mint List
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Link href="/admin/mint/create">Create new Mint</Link>
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Mint</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Mark</TableCell>
                <TableCell>Years</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mints.map((mint) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {mint.id}
                  </TableCell>
                  <TableCell>{mint.mint}</TableCell>
                  <TableCell>{mint.mark_description}</TableCell>
                  <TableCell>{mint.mark}</TableCell>
                  <TableCell>{mint.years}</TableCell>
                  <TableCell>{moment(mint.created_at).format('MMM DD, YYYY, HH:mm:ss')}</TableCell>
                  <TableCell>{moment(mint.updated_at).format('MMM DD, YYYY, HH:mm:ss')}</TableCell>
                  <TableCell>
                    <Link href={`./edit/${mint.id}`}>Edit</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
