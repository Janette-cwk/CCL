/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse {
    onCreateCourse {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse {
    onUpdateCourse {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse {
    onDeleteCourse {
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
export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection {
    onCreateSection {
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
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
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
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
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
export const onCreateContent = /* GraphQL */ `
  subscription OnCreateContent {
    onCreateContent {
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
export const onUpdateContent = /* GraphQL */ `
  subscription OnUpdateContent {
    onUpdateContent {
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
export const onDeleteContent = /* GraphQL */ `
  subscription OnDeleteContent {
    onDeleteContent {
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
export const onCreatePage = /* GraphQL */ `
  subscription OnCreatePage {
    onCreatePage {
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
export const onUpdatePage = /* GraphQL */ `
  subscription OnUpdatePage {
    onUpdatePage {
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
export const onDeletePage = /* GraphQL */ `
  subscription OnDeletePage {
    onDeletePage {
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
export const onCreateUserCourse = /* GraphQL */ `
  subscription OnCreateUserCourse {
    onCreateUserCourse {
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
export const onUpdateUserCourse = /* GraphQL */ `
  subscription OnUpdateUserCourse {
    onUpdateUserCourse {
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
export const onDeleteUserCourse = /* GraphQL */ `
  subscription OnDeleteUserCourse {
    onDeleteUserCourse {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateUserProgram = /* GraphQL */ `
  subscription OnCreateUserProgram {
    onCreateUserProgram {
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
export const onUpdateUserProgram = /* GraphQL */ `
  subscription OnUpdateUserProgram {
    onUpdateUserProgram {
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
export const onDeleteUserProgram = /* GraphQL */ `
  subscription OnDeleteUserProgram {
    onDeleteUserProgram {
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
export const onCreateProgram = /* GraphQL */ `
  subscription OnCreateProgram {
    onCreateProgram {
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
export const onUpdateProgram = /* GraphQL */ `
  subscription OnUpdateProgram {
    onUpdateProgram {
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
export const onDeleteProgram = /* GraphQL */ `
  subscription OnDeleteProgram {
    onDeleteProgram {
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
export const onCreateCertificate = /* GraphQL */ `
  subscription OnCreateCertificate {
    onCreateCertificate {
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
export const onUpdateCertificate = /* GraphQL */ `
  subscription OnUpdateCertificate {
    onUpdateCertificate {
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
export const onDeleteCertificate = /* GraphQL */ `
  subscription OnDeleteCertificate {
    onDeleteCertificate {
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
