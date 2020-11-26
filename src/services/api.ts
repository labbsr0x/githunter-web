import moment from 'moment';

import HttpClient from './httpClient';

export interface Request {
  startDateTime?: string;
  endDateTime?: string;
  provider?: string;
  filtersString?: string;
}

export interface RequestHistoric {
  startDateTime?: string;
  endDateTime?: string;
}

export interface RepositoryStats {
  dateTime: moment.Moment;
  owner: string;
  name: string;
  frequency: number;
  definitionOSS: number;
  popularity: number;
  friendly: number;
  quality: number;
  rawData: string;
  provider: string;
  type: string;
  language: string[];
}

class Api extends HttpClient {
  constructor() {
    const url = process.env.REACT_APP_BACKEND_URL;
    super(url, null);
  }

  public async getAllRepositories(
    params?: Request,
  ): Promise<RepositoryStats[]> {
    try {
      const response = await this.instance.get<RepositoryStats[]>(
        '/repositories',
        {
          params,
        },
      );

      return response.data;
    } catch (err) {
      return err;
    }
  }

  public async getRepositoryHistoric({
    dateRange,
    owner,
    name,
  }: {
    dateRange: RequestHistoric;
    owner: string;
    name: string;
  }): Promise<RepositoryStats[]> {
    try {
      const response = await this.instance.get<RepositoryStats[]>(
        `/repositories/name/${name}/owner/${owner}`,
        {
          params: dateRange,
        },
      );

      return response.data;
    } catch (err) {
      return err;
    }
  }
}

export default Api;
