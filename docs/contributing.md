# Contributing code to Agora Frontend

This is a living document. If you see something that could be improved, edit this document and submit a merge request following the instructions below!

## Table of Contents
* [Submitting a merge request](#submitting-a-merge-request)
* [Making sure your merge request is accepted](#making-sure-your-merge-request-is-accepted)
* [The review process](#the-review-process)
* [Work in progress merge requests](#work-in-progress-merge-requests)

## Submitting a merge request
To contribute code to Agora Frontend, you will need to open a [merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html) which will be reviewed by the community and then merged into the core project. Generally, a merge request is submitted when a unit of work is considered complete but it can sometimes be helpful to share ideas through a work in progress (WIP) merge request ([learn more](#work-in-progress-merge-requests)).

1. Read our [code style guidelines](https://angular.io/guide/styleguide). 

1. [Set up your development environment](https://gitlab.com/aossie/Agora-web-frontend#installation).

1. To make sure you have the latest version of the code, set up this repository as [a remote for your fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/) and then [sync your fork](https://about.gitlab.com/blog/2016/12/01/how-to-keep-your-fork-up-to-date-with-its-origin/).

1. Create a branch for the code you will be writing:

        git checkout -b NAME_OF_YOUR_BRANCH

1. If there is an [issue](https://gitlab.com/aossie/Agora-web-frontend/issues) corresponding to what you will work on, write a comment stating that you will like to claim that particular issue and a committer will assign you to it. If there is no issue yet, create one to provide background on the problem you are solving and wait for it to be approved by a committer. Only merged requests solving approved issues will be considered! Do not send a merge if the issue it's suppose to solve has not been approved.

1. Once you've made incremental progress towards you goal, commit your changes with a meaningful commit message. Use [keywords for closing issues](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically) to refer to issues and have them automatically close when your changes are merged.

        git commit -m "Do a thing. Fix #1."

1. Push changes to your fork at any time to make them publicly available:

        git push

1. Once you have completed your code changes, verify that you have followed the [style guidelines](https://angular.io/guide/styleguide).

1. When your changes are ready to be added to the core Agora Frontend project, [open a merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html). Make sure to set the base fork to `agora-web-frontend/develop`. Describe your changes in the comment, refer to any relevant issues using [keywords for closing issues](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically) and tag any person you think might need to know about the changes.

1. merge requests will be reviewed when committers have time. If you haven't received a review in 10 days, you may notify committers by putting `@icemc` or `@Thuva4` in a comment.

## Making sure your merge request is accepted
1. Confirm that your code compiles.

1. Verify the functionality. Ideally, include automated tests with each merge request. If that's not possible, describe in the merge request comment which cases you tried manually to confirm that your code works as expected. Attach a test form when appropriate. This form should only include questions which are useful for verifying your change. If the merge request solves a UI issue, attach a screen shot of the UI changes as seen on a desktop, mobile and tablet

1. Make sure that there is an issue that corresponds to the merge request and that it has been discussed by the community as necessary.

1. Keep your merge request focused on one narrow goal. This could mean addressing an issue with multiple, smaller merge requests. Small merge requests are easier to review and less likely to introduce bugs. If you would like to make stylistic changes to the code, create a separate merge request.

1. Write clear code. Use descriptive names and create meaningful abstractions (methods, classes).

1. Document your reasoning. Your commit messages should make it clear why each change has been made.

1. Point out decisions you made and what alternatives you considered. If you're unsure about a particular approach, ask a question to make your own thinking clear and help the reviewer identify controversial parts of the proposed solution. For example: "here I returned a result object to represent the status after the transaction. I also considered throwing an exception in case of error but I didn't like that it made it unclear where an error happened. Which do you prefer and why?" This is particularly important for [work in progress merge requests](#work-in-progress-merge-requests).

1. Follow the guidelines below.

## The review process
Bug fixes, merge requests corresponding to issues with a clearly stated goal and merge requests with clear tests and/or process for manual verification are given priority. merge requests that are unclear or controversial may be tagged as `needs discussion` and/or may take longer to review.

We try to have at least two people review every merge request and we encourage everyone to participate in the review process to get familiar with the code base and help ensure higher quality. Reviewers should ask themselves some or all of the following questions:
- Was this change adequately discussed prior to implementation?
- Is the intended behavior clear under all conditions?
- What interesting cases should be verified?
- Is the behavior as intended in all cases?
- What other functionality could this PR affect? Does that functionality still work as intended?
- Was the change verified with several different devices and Android versions?
- Is the code easy to understand and to maintain?
- Is there sufficient detail to inform any changes to documentation?

When a merge request is first created, a maintainer tags it as `needs review` to indicate that code review is needed. Community members review the code and leave their comments, verifying that the changes included are relevant and properly address the issue. A maintainer does a thorough code review and when satisfied with the code, tags the merge request as `needs testing` to indicate the need for a manual [black-box testing](https://en.wikipedia.org/wiki/Black-box_testing) pass. A merge request may go back and forth between `needs testing` and `needs review` until the behavior is thoroughly verified. Once the behavior has been thoroughly verified, the merge request is tagged as `reviewed and tested`. A maintainer then merges the changes. merge requests that need more complete reviews including review of approach and/or appropriateness are tagged with `reviews wanted`. Any community member is encouraged to participate in the review process!

Small fixes that target very particular bugs may occasionally be merged without a second review.

## Work in progress merge requests

Work in progress (WIP) merge requests are useful to illustrate a proposed direction and get early feedback before committing to a solution direction. These should ideally ideally be created as [WIP merge requests](https://docs.gitlab.com/ee/user/project/merge_requests/work_in_progress_merge_requests.html). 

A WIP merge request:
- Should include `[WIP]` in front of the merge request title.
- Should specifically describe the proposed solution and feedback wanted.
- Will not be merged until you remove `[WIP]` from the title.