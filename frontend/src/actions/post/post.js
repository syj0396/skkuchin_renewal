import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    LOAD_POST_FAIL,
    LOAD_POST_SUCCESS,
    LOAD_ALL_POSTS_SUCCESS,
    LOAD_ALL_POSTS_FAIL,
    LOAD_MY_POSTS_SUCCESS,
    LOAD_MY_POSTS_FAIL,
    LOAD_FAV_POSTS_SUCCESS,
    LOAD_FAV_POSTS_FAIL,
    ENROLL_POST_FAIL,
    ENROLL_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    MODIFY_POST_FAIL,
    MODIFY_POST_SUCCESS,
    SEARCH_POSTS_BY_TAG_FAIL,
    SEARCH_POSTS_BY_TAG_SUCCESS,
    SEARCH_POSTS_BY_KEYWORD_FAIL,
    SEARCH_POSTS_BY_KEYWORD_SUCCESS,
    CLEAR_SEARCH_POSTS,
    CLEAR_PREV_POST,
} from './types'

export const load_post = (postId, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/${postId}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_POST_SUCCESS,
                payload: apiRes.data
            })

            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_POST_FAIL
            })

            if (callback) callback([false, apiRes.message]);

        }
    } catch (error) {
        dispatch({
            type: LOAD_POST_FAIL
        })

        if (callback) callback([false, error]);

    }
}


export const load_all_posts = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });
        
        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_ALL_POSTS_SUCCESS,
                payload: apiRes.data
            })

            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_ALL_POSTS_FAIL
            })

            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_ALL_POSTS_FAIL
        })

        if (callback) callback([false, error]);
    }
}

export const load_my_posts = (userId, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/user/${userId}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_MY_POSTS_SUCCESS,
                payload: apiRes.data
            })

            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_MY_POSTS_FAIL
            })

            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_MY_POSTS_FAIL
        })

        if (callback) callback([false, error]);
    }
}

export const load_fav_posts = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/like`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });
        
        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_FAV_POSTS_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOAD_FAV_POSTS_FAIL
            })

            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_FAV_POSTS_FAIL
        })

        if (callback) callback([false, error]);
    }
}

export const enroll_post = (title, content, article_type, anonymous, images, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('articleType', article_type);
    formData.append('anonymous', anonymous);

    console.log(article_type);

    if (images && images.length > 0) {
        for (const image of images) {
            formData.append('images', image);
        }
    } else {
        formData.append('images', new File([""], { type: 'image/png' }));
    }

    try {
        const res = await fetch(`${API_URL}/api/article`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access}`
            },
            body: formData
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            dispatch({
                type: ENROLL_POST_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: ENROLL_POST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: ENROLL_POST_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const modify_post = (article_id, title, content, article_type, anonymous, urls, images, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('articleType', article_type);
    formData.append('anonymous', anonymous);

    if (images && images.length > 0) {
        for (const image of images) {
            formData.append('images', image);
        }
    } else {
        formData.append('images', new File([""], { type: 'image/png' }));
    }

    if (urls && urls.length > 0) {
        for (const url of urls) {
            formData.append('urls', url);
        }
    } else {
        formData.append('urls', '');
    }
    
    try {
        const res = await fetch(`${API_URL}/api/article/${article_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${access}`,
            },
            body: formData
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: MODIFY_POST_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: MODIFY_POST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    }
    catch (error) {
        dispatch({
            type: MODIFY_POST_FAIL
        });
        if (callback) callback([false, error]);
    }
}


export const delete_post = (article_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    try {
        const res = await fetch(`${API_URL}/api/article/${article_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_POST_SUCCESS
            })
            dispatch(load_all_posts());
            if (callback) callback([true, apiRes.message]);
            
        } else {
            dispatch({
                type: DELETE_POST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    }
    catch (error) {
        dispatch({
            type: DELETE_POST_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const search_posts_by_tag = (tag, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/tags/${tag}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_POSTS_BY_TAG_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: SEARCH_POSTS_BY_TAG_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    }
    catch (error) {
        dispatch({
            type: SEARCH_POSTS_BY_TAG_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const search_posts_by_keyword = (keyword, callback)=> async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/article/search/keyword?q=${keyword}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`,
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_POSTS_BY_KEYWORD_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: SEARCH_POSTS_BY_KEYWORD_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    }
    catch (error) {
        dispatch({
            type: SEARCH_POSTS_BY_KEYWORD_FAIL
        });
        if (callback) callback([false, error]);
    }
}


export const clear_search_posts = () => ({
    type: CLEAR_SEARCH_POSTS
});

export const clear_prev_post = () => ({
    type: CLEAR_PREV_POST
});