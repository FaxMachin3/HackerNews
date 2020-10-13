import React from "react";

function NewsItem({ data, meta, hideNews, countVotes }) {
    const calculateTime = (time) => {
        let timeElapsed = (new Date() - new Date(time)) / 1000 / 3600;
        if (timeElapsed < 1) return Math.round(60 * timeElapsed) + "minutes";
        else return Math.round(timeElapsed) + " hours";
    };

    if (meta && !meta[data.objectID].hide) {
    return (
        <div className="news-item">
            <div className="votes">
                <span className="vote" onClick = {() => countVotes(data.objectID, 0)}>&#9652;</span>
                {meta[data.objectID].votes}
                <span className="vote" onClick = {() => countVotes(data.objectID, 1)}>&#9662;</span>
            </div>
            <div className="content">
                <h4>
                    <a href={data.url} target="__blank">
                        {data.title}
                    </a>
                </h4>
                <div className="description">
                    {data.points} points by {data.author}{" "}
                    {calculateTime(data.created_at)} ago |{" "}
                    <span onClick={() => hideNews(data.objectID)}>hide</span>{" "}
                    | {data.num_comments} comments
                </div>
            </div>
        </div>
    );
    } else return null;
}

export default NewsItem;
