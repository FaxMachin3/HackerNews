import React, { useState, useEffect } from "react";
import Loader from "../loader/Loader";
import NewsItem from "./NewsItem";

function News() {
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState(null);
    const [meta, setMeta] = useState(null);

    const hideNews = (id) => {
        if (meta) {
            let temp = meta;
            temp[id].hide = true;
            const update = temp[id];
            setMeta((prevData) => {
                return {
                    ...prevData,
                    update,
                };
            });
        }
    };

    const countVotes = (id, flag) => {
        if (meta) {
            let temp = meta;
            flag ? temp[id].votes-- : temp[id].votes++;
            const update = temp[id];
            setMeta((prevData) => {
                return {
                    ...prevData,
                    update,
                };
            });
        }
    };

    useEffect(() => {
        meta && localStorage.setItem("metaData", JSON.stringify(meta));
        return () => {
            // cleanup
        };
    }, [meta]);

    useEffect(() => {
        const metaData = JSON.parse(localStorage.getItem("metaData"));
        fetch("https://hn.algolia.com/api/v1/search?tags=front_page")
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setState(data);
                let md = {};
                data.hits.forEach(
                    (e) => (md[e.objectID] = { hide: false, votes: 0 })
                );
                if (metaData) {
                    md = { ...metaData, ...md };
                }
                setMeta(md);
            })
            .catch((err) => {
                setLoading(true);
            });
        return () => {
            // cleanup;
        };
    }, []);

    if (loading) {
        return (
            <div className="loader">
                <Loader />
            </div>
        );
    }

    return (
        <main>
            {state &&
                state.hits.map((ele) => (
                    <NewsItem
                        key={ele.objectID}
                        data={ele}
                        meta={meta}
                        hideNews={hideNews}
                        countVotes={countVotes}
                    />
                ))}
        </main>
    );
}

export default News;
