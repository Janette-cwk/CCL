/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      name
      status
      version
      UserCourse {
        items {
          progress
          quiz_score
          certificate_status
        }
        nextToken
      }
      sections {
        items {
          id
          name
        }
        nextToken
      }
    }
  }
`;

export const getCourseComplete = /* GraphQL */ `
query getCourseComplete($id: ID!) {
  getCourse(id: $id) {
      id
      name
      status
      version
      UserCourse {
        nextToken
      }
      sections {
        items {
          id
        	name
        	pages {
          	items {
          		id
          		name
          		template
          		content {
                items {
                  id
                  content
                  contentType
                }
          		} 
        		}
      		}
    		}
      }
	  }
  }
`;



export const listCoursesAll = /* GraphQL */ `
query ListCoursesAll(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        version
        created_at
        UserCourse {
          nextToken
        }
        sections {
          items {
            id
            index
            name
            pages {
              items {
                id
                index
                name
                template
                content {
                  items {
                    id
                    index
                    content
                    contentType
                  }
                }
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;

export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        version
        UserCourse {
          nextToken
        }
        sections {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      name
      course {
        id
        name
        status
        version
        UserCourse {
          nextToken
        }
        sections {
          nextToken
        }
      }
      pages {
        items {
          id
          name
          template
        }
        nextToken
      }
    }
  }
`;
export const listSections = /* GraphQL */ `
  query ListSections(
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        course {
          id
          name
          status
          version
        }
        pages {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      page {
        id
        name
        content {
          nextToken
        }
        section {
          id
          name
        }
        template
      }
      content
      contentType
    }
  }
`;
export const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        page {
          id
          name
          template
        }
        content
        contentType
      }
      nextToken
    }
  }
`;
export const getPage = /* GraphQL */ `
  query GetPage($id: ID!) {
    getPage(id: $id) {
      id
      name
      content {
        items {
          id
          content
          contentType
        }
        nextToken
      }
      section {
        id
        name
        course {
          id
          name
          status
          version
        }
        pages {
          nextToken
        }
      }
      template
    }
  }
`;
export const listPages = /* GraphQL */ `
  query ListPages(
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        content {
          nextToken
        }
        section {
          id
          name
        }
        template
      }
      nextToken
    }
  }
`;
export const getUserCourse = /* GraphQL */ `
  query GetUserCourse($id: ID!) {
    getUserCourse(id: $id) {
      user {
        id
        first_name
        last_name
        UserCourse {
          nextToken
        }
        UserProgram {
          nextToken
        }
        certificates {
          nextToken
        }
      }
      course {
        id
        name
        status
        version
        UserCourse {
          nextToken
        }
        sections {
          nextToken
        }
      }
      progress
      quiz_score
      certificate_status
    }
  }
`;
export const listUserCourses = /* GraphQL */ `
  query ListUserCourses(
    $filter: ModelUserCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user {
          id
          first_name
          last_name
        }
        course {
          id
          name
          status
          version
        }
        progress
        quiz_score
        certificate_status
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      UserCourse {
        items {
          progress
          quiz_score
          certificate_status
        }
        nextToken
      }
      UserProgram {
        items {
          begin_date
          completion_date
        }
        nextToken
      }
      certificates {
        items {
          cert_code
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        UserCourse {
          nextToken
        }
        UserProgram {
          nextToken
        }
        certificates {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUserProgram = /* GraphQL */ `
  query GetUserProgram($id: ID!) {
    getUserProgram(id: $id) {
      user {
        id
        first_name
        last_name
        UserCourse {
          nextToken
        }
        UserProgram {
          nextToken
        }
        certificates {
          nextToken
        }
      }
      program {
        id
        creation_date
        name
        UserProgram {
          nextToken
        }
      }
      begin_date
      completion_date
    }
  }
`;
export const listUserPrograms = /* GraphQL */ `
  query ListUserPrograms(
    $filter: ModelUserProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user {
          id
          first_name
          last_name
        }
        program {
          id
          creation_date
          name
        }
        begin_date
        completion_date
      }
      nextToken
    }
  }
`;
export const getProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
      id
      creation_date
      name
      UserProgram {
        items {
          begin_date
          completion_date
        }
        nextToken
      }
    }
  }
`;
export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        creation_date
        name
        UserProgram {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCertificate = /* GraphQL */ `
  query GetCertificate($id: ID!) {
    getCertificate(id: $id) {
      cert_code
      user {
        id
        first_name
        last_name
        UserCourse {
          nextToken
        }
        UserProgram {
          nextToken
        }
        certificates {
          nextToken
        }
      }
    }
  }
`;
export const listCertificates = /* GraphQL */ `
  query ListCertificates(
    $filter: ModelCertificateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCertificates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        cert_code
        user {
          id
          first_name
          last_name
        }
      }
      nextToken
    }
  }
`;
