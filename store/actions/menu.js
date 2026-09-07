export const SET_MENU = "SET_MENU";
export const SET_LATEST_MENU = "SET_LATEST_MENU";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_DETAIL_MENU = "SET_DETAIL_MENU";
export const IS_LOADING = "IS_LOADING";
export const IS_LOADING_FALSE = "IS_LOADING_FALSE";

const requestJson = (dispatch, url, onSuccess) => {
  dispatch({ type: IS_LOADING, isFetching: true });

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Menu request failed with status ${res.status}`);
      }

      return res.json();
    })
    .then((json) => {
      dispatch(onSuccess(json));
      return json;
    })
    .catch((err) => {
      dispatch({ type: IS_LOADING_FALSE, isFetching: false });
      throw err;
    });
};

export const fetchCategory = () => {
  return (dispatch) => {
    return requestJson(dispatch, "https://www.themealdb.com/api/json/v1/1/categories.php", (json) => ({
      type: SET_CATEGORY,
      categoryList: json,
    }));
  };
};

export const fetchLatestMenu = () => {
  return (dispatch) => {
    return requestJson(dispatch, "https://www.themealdb.com/api/json/v1/1/search.php?f=d", (json) => ({
      type: SET_LATEST_MENU,
      latestMenu: json,
    }));
  };
};

export const fetchMenu = (cid) => {
  return (dispatch) => {
    return requestJson(dispatch, `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cid}`, (json) => ({
      type: SET_MENU,
      availableMenu: json,
    }));
  };
};

export const fetchAllMenu = (cid) => {
  return (dispatch) => {
    return requestJson(dispatch, `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cid}`, (json) => ({
      type: SET_LATEST_MENU,
      latestMenu: json,
    }));
  };
};

export const fetchDetailMenu = (id) => {
  return (dispatch) => {
    return requestJson(dispatch, `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, (json) => {
      if (!json.meals?.[0]) {
        throw new Error("Menu detail not found");
      }

      return {
        type: SET_DETAIL_MENU,
        detailMenu: json.meals[0],
        isFetching: false,
      };
    });
  };
};

export const isLoadingHandler = (action) => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING, isFetching: action });
  };
};
export const isLoadingHandlerFalse = (action) => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING_FALSE, isFetching: action });
  };
};
