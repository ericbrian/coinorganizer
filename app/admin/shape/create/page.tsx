'use client';

import { getShapeById } from '@/http/shape';
import { getIdFromPath } from '@/utils';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { shape as ShapeType } from '@prisma/client';
import { usePathname } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';

export default function page() {
  const pathname = usePathname();

  // Shape Name
  const [shape, setShape] = useState('');

  // For Editing
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  useEffect(() => {
    if (pathname.includes('/edit')) {
      const id = getIdFromPath(pathname);
      if (id) {
        setEditId(id);
        setIsLoading(true);
        getShapeById(id)
          .then((data: ShapeType) => {
            setShape(data.name as string);
            setEditId(data.id);
          })
          .catch((error: any) => {
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Shape - {pathname.includes('/edit') ? 'Edit' : 'Create'}
        </Typography>
        {!isLoading && (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Shape"
              onChange={(e) => setShape(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3, mt: 5 }}
              fullWidth
              value={shape}
            />
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </form>
        )}{' '}
      </Box>
    </Container>
  );
}
