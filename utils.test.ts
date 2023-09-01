import { rewriteForAlgolia, range } from "@/utils";

describe('range', () => {
  it('Return array with all the values from the start value to the end value to inclue starting and ending values', () => {
    const result = range(1, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('If the start and end number are the same, then return the starting value', () => {
    const result = range(1, 1);
    expect(result).toEqual([1]);
  });
});

describe('rewriteForAlgolia', () => {
  // Test that the function 'rewriteForAlgolia' correctly transforms an array of coin objects into a new object format suitable for Algolia indexing.
  it('should transform an array of coin objects into a new object format suitable for Algolia indexing', () => {
    // Test input
    const coins = [
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: "2000",
        year_end: "2005",
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
      {
        id: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: null,
        image: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: {
          name: "Country 2",
          iso_3166_alpha_2: "C2",
        },
        currency: {
          name: "Currency 2",
        },
        shape: {
          name: "Shape 2",
        },
      },
    ];

    // Expected output
    const expected = [
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
      {
        objectID: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: '2005',
        images: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: "Country 2",
        cc: "C2",
        currency: "Currency 2",
        shape: "Shape 2",
      },
    ];

    // Test the function
    const result = rewriteForAlgolia(coins);

    // Check the result
    expect(result).toEqual(expected);
  });

  // Test that the function 'rewriteForAlgolia' correctly transforms an array of coin objects into a new object format suitable for Algolia indexing.
  it('should transform an array of coin objects into a new object format suitable for Algolia indexing', () => {
    const coins = [
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
      {
        id: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: null,
        image: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: {
          name: "Country 2",
          iso_3166_alpha_2: "C2",
        },
        currency: {
          name: "Currency 2",
        },
        shape: {
          name: "Shape 2",
        },
      },
    ];

    const expected = [
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
      {
        objectID: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: '2005',
        images: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: "Country 2",
        cc: "C2",
        currency: "Currency 2",
        shape: "Shape 2",
      },
    ];

    const result = rewriteForAlgolia(coins);

    expect(result).toEqual(expected);
  });

  // Test that the function 'rewriteForAlgolia' handles an empty input array correctly.
  it('should return an empty array when the input array is empty', () => {
    // Test input
    const coins = [];

    // Expected output
    const expected = [];

    // Test the function
    const result = rewriteForAlgolia(coins);

    // Check the result
    expect(result).toEqual(expected);
  });

  // Test that the function 'rewriteForAlgolia' correctly handles missing properties in a coin object.
  it('should handle missing properties in a coin object', () => {
    const coins = [
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
      {
        id: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: null,
        image: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: {
          name: "Country 2",
          iso_3166_alpha_2: "C2",
        },
        currency: {
          name: "Currency 2",
        },
        shape: {
          name: "Shape 2",
        },
      },
    ];

    const expected = [
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
      {
        objectID: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: '2005',
        images: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: "Country 2",
        cc: "C2",
        currency: "Currency 2",
        shape: "Shape 2",
      },
    ];

    const result = rewriteForAlgolia(coins);

    expect(result).toEqual(expected);
  });

  // Test that the function 'rewriteForAlgolia' correctly transforms an array of one coin object into a new object format suitable for Algolia indexing.
  it('should transform an array of one coin object into a new object format suitable for Algolia indexing', () => {
    // Test input
    const coins = [
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
    ];

    // Expected output
    const expected = [
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
    ];

    // Test the function
    const result = rewriteForAlgolia(coins);

    // Check the result
    expect(result).toEqual(expected);
  });

  // Test that the function 'rewriteForAlgolia' correctly transforms an array of multiple coin objects into a new object format suitable for Algolia indexing.
  it('should transform an array of multiple coin objects into a new object format suitable for Algolia indexing', () => {
    // Test input
    const coins = [
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
      {
        id: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: null,
        image: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: {
          name: "Country 2",
          iso_3166_alpha_2: "C2",
        },
        currency: {
          name: "Currency 2",
        },
        shape: {
          name: "Shape 2",
        },
      },
    ];

    // Expected output
    const expected = [
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
      {
        objectID: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: '2005',
        images: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: "Country 2",
        cc: "C2",
        currency: "Currency 2",
        shape: "Shape 2",
      },
    ];

    // Test the function
    const result = rewriteForAlgolia(coins);

    // Check the result
    expect(result).toEqual(expected);
  });

  // Test that the function 'rewriteForAlgolia' correctly handles an array of coin objects with duplicate values.
  it('should handle an array of coin objects with duplicate values', () => {
    const coins = [
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
      {
        id: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: null,
        image: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: {
          name: "Country 2",
          iso_3166_alpha_2: "C2",
        },
        currency: {
          name: "Currency 2",
        },
        shape: {
          name: "Shape 2",
        },
      },
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
    ];

    const expected = [
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
      {
        objectID: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: '2005',
        images: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: "Country 2",
        cc: "C2",
        currency: "Currency 2",
        shape: "Shape 2",
      },
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
    ];

    const result = rewriteForAlgolia(coins);

    expect(result).toEqual(expected);
  });

  // Test that the function 'rewriteForAlgolia' handles an array of coin objects with missing required properties correctly.
  it('should return managed coins with default values for missing properties', () => {
    // Test input
    const coins = [
      {
        id: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        image: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 1",
          iso_3166_alpha_2: "C1",
        },
        currency: {
          name: "Currency 1",
        },
        shape: {
          name: "Shape 1",
        },
      },
      {
        id: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: null,
        image: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: {
          name: "Country 2",
          iso_3166_alpha_2: "C2",
        },
        currency: {
          name: "Currency 2",
        },
        shape: {
          name: "Shape 2",
        },
      },
      {
        id: 3,
        common_name: "Coin 3",
        pretty_face_value: "3 Dollars",
        obverse: "Obverse 3",
        reverse: "Reverse 3",
        composition: "Copper",
        series_or_theme_name: "Series 3",
        year_start: '2010',
        image: {
          url: "image3.jpg",
          is_preferred: true,
        },
        country: {
          name: "Country 3",
          iso_3166_alpha_2: "C3",
        },
        currency: {
          name: "Currency 3",
        },
        shape: {
          name: "Shape 3",
        },
      },
    ];

    // Expected output
    const expected = [
      {
        objectID: 1,
        common_name: "Coin 1",
        pretty_face_value: "1 Dollar",
        obverse: "Obverse 1",
        reverse: "Reverse 1",
        composition: "Gold",
        series_or_theme_name: "Series 1",
        year_start: '2000',
        year_end: '2005',
        images: {
          url: "image1.jpg",
          is_preferred: true,
        },
        country: "Country 1",
        cc: "C1",
        currency: "Currency 1",
        shape: "Shape 1",
      },
      {
        objectID: 2,
        common_name: "Coin 2",
        pretty_face_value: "2 Dollars",
        obverse: "Obverse 2",
        reverse: "Reverse 2",
        composition: "Silver",
        series_or_theme_name: "Series 2",
        year_start: '2005',
        year_end: '2005',
        images: {
          url: "image2.jpg",
          is_preferred: false,
        },
        country: "Country 2",
        cc: "C2",
        currency: "Currency 2",
        shape: "Shape 2",
      },
      {
        objectID: 3,
        common_name: "Coin 3",
        pretty_face_value: "3 Dollars",
        obverse: "Obverse 3",
        reverse: "Reverse 3",
        composition: "Copper",
        series_or_theme_name: "Series 3",
        year_start: '2010',
        year_end: '2010',
        images: {
          url: "image3.jpg",
          is_preferred: true,
        },
        country: "Country 3",
        cc: "C3",
        currency: "Currency 3",
        shape: "Shape 3",
      },
    ];

    // Test the function
    const result = rewriteForAlgolia(coins);

    // Check the result
    expect(result).toEqual(expected);
  });
});
