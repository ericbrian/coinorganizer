import axios from "axios";

export async function getStaticProps() {
  const data = await axios.get('https://restcountries.com/v3.1/all');
  return {
    props: {
      countries: data.data,
    },
  };
}
