import axios from 'axios';


export const ghUserQuery = ({username, perPage, page} : {username: string; perPage: number; page: number}): string => {
    return `https://api.github.com/search/repositories?q=user:${username}&per_page=${perPage}&page=${page}`;
  }
  
const ghAuthHeader = (ghToken: string): { Authorization: string; 'Accept-Encoding': string} => {
    return {
        'Authorization': `token ${ghToken}`,
        'Accept-Encoding': 'application/json',
    }
}
  
export const getGithubData = async (perPage: number, pageNumber: number) => {
    const res =  await axios.get(ghUserQuery({
    username:  process.env.GH_USERNAME,
    perPage: perPage,
    page: pageNumber,
    }), {
        headers: ghAuthHeader(process.env.GH_TOKEN)
    },);
    return res;
} 
