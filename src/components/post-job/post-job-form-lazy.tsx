
'use client';

import { lazy } from 'react';

const PostJobFormLazy = lazy(() =>
  import('@/components/post-job/post-job-form').then(module => ({
    default: module.PostJobForm,
  }))
);

export default PostJobFormLazy;
