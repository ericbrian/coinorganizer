import prisma from "@/lib/prisma";
import { GET } from "./route";
import { NextResponse } from "next/server";

describe('GET', () => {

  beforeEach(() => {
  });
  afterEach(() => {
  });

  // Tests that the function returns a list of coins in AlgoliaCoinType format
  it('should return a list of coins in AlgoliaCoinType format', async () => {
    // Mock the PrismaClient and its coin.findMany method
    const prismaMock = jest.spyOn(prisma.coin, 'findMany').mockResolvedValue([
      {
        id: 1,
        common_name: 'Coin 1',
        pretty_face_value: '1 Dollar',
        obverse: 'Obverse 1',
        reverse: 'Reverse 1',
        composition: 'Gold',
        series_or_theme_name: 'Series 1',
        year_start: '2000',
        year_end: '2005',
        image: {
          url: 'image1.jpg',
          is_preferred: true,
        },
        country: {
          name: 'Country 1',
          iso_3166_alpha_2: 'C1',
        },
        currency: {
          name: 'Currency 1',
        },
        shape: {
          name: 'Shape 1',
        },
      },
      {
        id: 2,
        common_name: 'Coin 2',
        pretty_face_value: '2 Dollars',
        obverse: 'Obverse 2',
        reverse: 'Reverse 2',
        composition: 'Silver',
        series_or_theme_name: 'Series 2',
        year_start: '2005',
        year_end: '2010',
        image: {
          url: 'image2.jpg',
          is_preferred: false,
        },
        country: {
          name: 'Country 2',
          iso_3166_alpha_2: 'C2',
        },
        currency: {
          name: 'Currency 2',
        },
        shape: {
          name: 'Shape 2',
        },
      },
    ]);

    const expected = [
      {
        objectID: 1,
        common_name: 'Coin 1',
        pretty_face_value: '1 Dollar',
        obverse: 'Obverse 1',
        reverse: 'Reverse 1',
        composition: 'Gold',
        series_or_theme_name: 'Series 1',
        year_start: '2000',
        year_end: '2005',
        images: {
          url: 'image1.jpg',
          is_preferred: true,
        },
        country: 'Country 1',
        cc: 'C1',
        currency: 'Currency 1',
        shape: 'Shape 1',
      },
      {
        objectID: 2,
        common_name: 'Coin 2',
        pretty_face_value: '2 Dollars',
        obverse: 'Obverse 2',
        reverse: 'Reverse 2',
        composition: 'Silver',
        series_or_theme_name: 'Series 2',
        year_start: '2005',
        year_end: '2010',
        images: {
          url: 'image2.jpg',
          is_preferred: false,
        },
        country: 'Country 2',
        cc: 'C2',
        currency: 'Currency 2',
        shape: 'Shape 2',
      },
    ];

    const response = await GET();
    expect(response).toEqual(NextResponse.json(expected));
    prismaMock.mockRestore();
  });

  // Tests that the function returns an empty list if no coins are found
  it('should return an empty list if no coins are found', async () => {
    // Mock the PrismaClient and its coin.findMany method
    const prismaMock = jest.spyOn(prisma.coin, 'findMany').mockResolvedValue([]);

    const expected = { message: 'No coins found.' };

    const response = await GET();

    expect(response).toEqual(NextResponse.json(expected));

    prismaMock.mockRestore();
  });

  // Tests that the function returns an error response if an error occurs during the database query
  it('should return an error response if an error occurs during the database query', async () => {
    // Mock the PrismaClient and its coin.findMany method to throw an error
    const prismaMock = jest.spyOn(prisma.coin, 'findMany').mockRejectedValue(new Error('Database query error'));

    const expected = { error: new Error('Database query error') };

    const response = await GET();

    expect(response).toEqual(NextResponse.json(expected));

    prismaMock.mockRestore();
  });

  // Tests that the function returns an error response if the database connection fails
  it('should return an error response if the database connection fails', async () => {
    // Mock the PrismaClient and its coin.findMany method to throw an error
    const prismaMock = jest.spyOn(prisma.coin, 'findMany').mockRejectedValue(new Error('Database connection failed'));

    const expected = { error: new Error('Database connection failed') };

    const response = await GET();

    expect(response).toEqual(NextResponse.json(expected));

    prismaMock.mockRestore();
  });
});
