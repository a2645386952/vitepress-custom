<template>
    <div class="comment-container">
        <div id="gitalk-container"></div>
    </div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'
export default {
    name: "comment",
    mounted() {
        const commentConfig = {
            clientID: 'b8f1bac3db10c9fad408',
            clientSecret: '086a4ba4f6846b95a1496d8fbdde985b0e46fad8',
            repo: "mySite",
            owner: "huyikai",
            admin: ["huyikai"],
            id: md5(location.pathname)
        };
        const gitalk = new Gitalk(commentConfig);
        gitalk.render("gitalk-container");
    },
};
</script>
<style scoped>
.comment-container {
    border-top: 1px solid rgba(84, 84, 84, 0.48);
    padding-top: 24px;
    margin-top: 24px;
}

.comment-container :deep(.gt-container .gt-header-textarea) {
    background-color: #d9d9d9;
    color: #333;
}
</style>
