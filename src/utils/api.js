import axios from "axios";
import jwt_decode from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
 
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company
    }
    catch {
      return false
    }
  }

  /** Get all companies, can filter company name by search term if included */ 
  static async getCompanies(searchTerm='') {
    let url = searchTerm ? `companies?name=${searchTerm}` : 'companies' 
    let res = await this.request(url)
    return res.companies;
  }

  /**  Get all jobs, can filter job title by search term if included */
  static async getJobs(searchTerm='') {
    let url = searchTerm ? `jobs?title=${searchTerm}` : 'jobs'
    let res = await this.request(url)
    return res.jobs;
  }

  /**  Login - get { token } back from user with valid username/password credentials */
  static async getToken(username, password) {
    let res = await this.request(`auth/token`, {username, password},"post")
    let token = res.token
    this.token = token
    return token
  }

  /**  Register - get { token } back from user with valid signup credentials */
  static async register(user) {
    const {username, password, firstName, lastName, email } = user
    let res = await this.request(`auth/register`, {username, password, firstName, lastName, email}, "post")
    let token = res.token
    this.token = token
    return token
  } 

  /** Get user information using provided token. Returns { user } */ 
  static async getUser(token) {
    this.token = token
    const payload = jwt_decode(token) // not verified? / shouldn't be decoding token in front end anyway? / not sure how else to get username
    let res = await this.request(`users/${payload.username}`)
    return res.user
  }

  /** Update user's firstName, lastName, or email. Returns updated { user }*/
  static async updateUserInfo(username, dataToUpdate) {
    const {firstName, lastName, email} = dataToUpdate
    let res = await this.request(`users/${username}`, {firstName, lastName, email}, "patch")
    return res.user
  }

  /** Allow user to apply for job -> add jobId to user.applications */
  static async applyForJob(username, jobId){
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post")
    return
  }
}

export default JoblyApi;