const core = require('@actions/core')
const github = require('@actions/github')

async function run() { // the function involves async operations
    try {
        const token = core.getInput('github-token', {required : true} ) //gets the input from the core action, which is required
        const octokit = github.getOctokit(token); // the getOctokit method is an utility provided by the @actions/github package in gh actions and semplifies the process of creating an authenticaded instance of the Octokit client, which is a javascript liberary for gh api interactions. It uses a token for authentication
        const context = github.context

        if(context.payload.pull_request) {
            //Label a newly opened pull request
            await octokit.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.payload.pull_request.number,
                labels: ['automated-label'],
            });
        }

        // ex: create a comment
        await octokit.rest.issues.createComment({
            owner: 'ownerName',
            repo: 'repoName',
            issue_number: 1,
            body: "This is a comment created by my GitHub Action"
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

// call of the function
run();