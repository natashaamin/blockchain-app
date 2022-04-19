import { useEffect, useState } from "react";

const APIKEY = process.env.REACT_APP_GIF_KEY;

const useFetch = ({keyword}) => {
    const[gifUrls, setGifUrls] = useState("");

    const fetchGifs = async() => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);

            const { data } = await response.json();

            setGifUrls(data[0]?.images?.downsized_medium.url);

        } catch(e) {
            setGifUrls("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        }
    }

    useEffect(() => {
        if (keyword) fetchGifs();
    }, [keyword]);

    return gifUrls;
}

export default useFetch;