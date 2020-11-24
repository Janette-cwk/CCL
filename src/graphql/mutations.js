/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      name
      status
      version
      created_at
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
  ) {
    deleteCourse(input: $input) {
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
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
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
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
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
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
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
export const createContent = /* GraphQL */ `
  mutation CreateContent(
    $input: CreateContentInput!
    $condition: ModelContentConditionInput
  ) {
    createContent(input: $input, condition: $condition) {
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
export const updateContent = /* GraphQL */ `
  mutation UpdateContent(
    $input: UpdateContentInput!
    $condition: ModelContentConditionInput
  ) {
    updateContent(input: $input, condition: $condition) {
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
export const deleteContent = /* GraphQL */ `
  mutation DeleteContent(
    $input: DeleteContentInput!
    $condition: ModelContentConditionInput
  ) {
    deleteContent(input: $input, condition: $condition) {
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
export const createPage = /* GraphQL */ `
  mutation CreatePage(
    $input: CreatePageInput!
    $condition: ModelPageConditionInput
  ) {
    createPage(input: $input, condition: $condition) {
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
export const updatePage = /* GraphQL */ `
  mutation UpdatePage(
    $input: UpdatePageInput!
    $condition: ModelPageConditionInput
  ) {
    updatePage(input: $input, condition: $condition) {
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
export const deletePage = /* GraphQL */ `
  mutation DeletePage(
    $input: DeletePageInput!
    $condition: ModelPageConditionInput
  ) {
    deletePage(input: $input, condition: $condition) {
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
export const createUserCourse = /* GraphQL */ `
  mutation CreateUserCourse(
    $input: CreateUserCourseInput!
    $condition: ModelUserCourseConditionInput
  ) {
    createUserCourse(input: $input, condition: $condition) {
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
export const updateUserCourse = /* GraphQL */ `
  mutation UpdateUserCourse(
    $input: UpdateUserCourseInput!
    $condition: ModelUserCourseConditionInput
  ) {
    updateUserCourse(input: $input, condition: $condition) {
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
export const deleteUserCourse = /* GraphQL */ `
  mutation DeleteUserCourse(
    $input: DeleteUserCourseInput!
    $condition: ModelUserCourseConditionInput
  ) {
    deleteUserCourse(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserProgram = /* GraphQL */ `
  mutation CreateUserProgram(
    $input: CreateUserProgramInput!
    $condition: ModelUserProgramConditionInput
  ) {
    createUserProgram(input: $input, condition: $condition) {
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
export const updateUserProgram = /* GraphQL */ `
  mutation UpdateUserProgram(
    $input: UpdateUserProgramInput!
    $condition: ModelUserProgramConditionInput
  ) {
    updateUserProgram(input: $input, condition: $condition) {
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
export const deleteUserProgram = /* GraphQL */ `
  mutation DeleteUserProgram(
    $input: DeleteUserProgramInput!
    $condition: ModelUserProgramConditionInput
  ) {
    deleteUserProgram(input: $input, condition: $condition) {
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
export const createProgram = /* GraphQL */ `
  mutation CreateProgram(
    $input: CreateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    createProgram(input: $input, condition: $condition) {
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
export const updateProgram = /* GraphQL */ `
  mutation UpdateProgram(
    $input: UpdateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    updateProgram(input: $input, condition: $condition) {
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
export const deleteProgram = /* GraphQL */ `
  mutation DeleteProgram(
    $input: DeleteProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    deleteProgram(input: $input, condition: $condition) {
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
export const createCertificate = /* GraphQL */ `
  mutation CreateCertificate(
    $input: CreateCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    createCertificate(input: $input, condition: $condition) {
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
export const updateCertificate = /* GraphQL */ `
  mutation UpdateCertificate(
    $input: UpdateCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    updateCertificate(input: $input, condition: $condition) {
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
export const deleteCertificate = /* GraphQL */ `
  mutation DeleteCertificate(
    $input: DeleteCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    deleteCertificate(input: $input, condition: $condition) {
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
