import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCreatorName } from "../../services/utils";

const TrendingList = (data) => {
  const [project, setProject] = useState({});
  const [creator, setCreator] = useState("");
  const {
    id,
    user_id,
    title,
    description,
    funding_goal,
    balance,
    image,
    date_goal,
    category,
  } = data.data;

  const projectData = {
    id: id,
    user_id: user_id,
    title: title,
    description: description,
    funding_goal: funding_goal,
    balance: balance,
    image: image,
    date_goal: date_goal,
    category: category,
  };

  useEffect(() => {
    if (projectData) {
      setProject(projectData);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      if (project.user_id) {
        try {
          const ownerName = await getCreatorName(project.user_id);
          setCreator(ownerName);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [project]);

  const funding = () => {
    const current = parseInt((balance * 100) / funding_goal);
    const percentFunded = current + "% funded";
    return percentFunded;
  };
  return (
    <>
      <li className="trending-projects__right-panel-list-item">
        <div className="trending-projects__right-panel-list-item-container">
          <NavLink
            to={"/project/" + id}
            className="trending-projects__right-panel-list-item-navlink"
          >
            <div
              className="trending-projects__right-panel-list-item-navlink-wrapper"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </NavLink>
          <div className="trending-projects__right-panel-list-item-info-container">
            <div>
              <NavLink
                to={"/project/" + id}
                className="trending-projects__right-panel-list-item-name"
              >
                {title}
              </NavLink>
              <span className="trending-projects__right-panel-list-item-funding">
                {funding()}
              </span>
              <div>
                <NavLink
                  to={"/project/" + id}
                  className="trending-projects__right-panel-list-item-creator"
                >
                  <span>{"By " + creator}</span>
                </NavLink>
              </div>
              <div className="trending-projects__right-panel-list-button-container">
                <div className="trending-projects__right-panel-list-button">
                  <div>
                    <button className="trending-projects__right-panel-list-button-wrapper">
                      <svg viewBox="0 0 12 16">
                        <g>
                          <path
                            d="M0 0h12v15.067c0 .166-.134.3-.3.3-.055 0-.11-.015-.156-.043l-5.5-3.338-5.59 3.343c-.142.084-.326.037-.41-.105-.03-.046-.044-.1-.044-.154V0zm1.8 1.8v10.627l4.25-2.542 4.15 2.517V1.8H1.8z"
                            fillRule="nonzero"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="trending-projects__right-panel-list-button">
                  <div>
                    <button className="trending-projects__right-panel-list-button-wrapper">
                      <svg viewBox="0 0 15 15">
                        <g>
                          <path
                            d="M8.875 2.1v1.85h4.984c.63 0 1.14.512 1.14 1.14 0 .097-.012.193-.036.285l-2.135 8.31c-.13.505-.585.858-1.105.858H3.2v-.005H.5c-.276 0-.5-.223-.5-.5V5.915c0-.276.224-.5.5-.5h2.882L4.19 3.09V1.208c0-.57.42-1.053.986-1.13 2.26-.31 3.7.312 3.7 2.024zM5.9 1.716v1.472c0 .128-.02.255-.062.375l-.706 2.026v7.243l6.15.002 1.842-7.17H8.59c-.787 0-1.426-.64-1.426-1.426V2.1c0-.307-.285-.47-1.263-.385zm-2.478 5.41h-1.71v5.703h1.71V7.125z"
                            fillRule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="trending-projects__right-panel-list-button">
                  <div>
                    <button className="trending-projects__right-panel-list-button-wrapper">
                      <svg viewBox="0 0 15 15">
                        <g>
                          <path
                            d="M6.125 12.44v-1.848H1.14c-.63 0-1.14-.51-1.14-1.14 0-.097.012-.192.036-.285L2.17.857C2.3.353 2.756 0 3.276 0H11.8v.005h2.7c.276 0 .5.223.5.5v8.124c0 .275-.224.5-.5.5h-2.882l-.808 2.322v1.884c0 .57-.42 1.053-.986 1.13-2.26.31-3.7-.312-3.7-2.025zm2.974.388v-1.473c0-.127.02-.254.062-.375l.706-2.025V1.712h-6.15L1.876 8.88H6.41c.787 0 1.426.637 1.426 1.425v2.134c0 .31.285.474 1.263.388zm2.478-5.41h1.71V1.715h-1.71v5.703z"
                            fillRule="evenodd"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default TrendingList;