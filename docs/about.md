# About me

## brief
Have {{experience}} years working experience, Know a little bit of code.

## contact

- Email: huyikai_tiger@foxmail.com <a @click="copy('huyikai_tiger@foxmail.com')" class="btn-copy">copy</a>
  
- Wechat: huyikai <a @click="copy('huyikai')" class="btn-copy">copy</a>


## Last

Technology stack and version of this site
<ul>
    <li v-for="(item,index) in devDependencies" :key="index" >
        <div>{{item.key}}: {{item.value}}</div>
    </li>
</ul>
<br>
<VPButton
  tag="a"
  size="medium"
  theme="brand"
  text="back to home"
  href="/"
/>

<script setup>
    import config from '/../package.json'
    import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
    
    // calc work experience time
    const experience=new Date().getFullYear()-2015

    // get package.json devDependencies
    const devDependencies=[]
    for(let key in config.devDependencies){
        devDependencies.push({
            key:key,
            value:config.devDependencies[key]
        })
    }

    const copy=(text)=>{
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('readonly', 'readonly')
      input.setAttribute('value', text)
      input.select()
      input.setSelectionRange(0, text.length)
      try {
        document.execCommand('copy')
        alert('copyed')
      } catch (err) { }
      document.body.removeChild(input)
    }
</script>

<style scoped>
    .btn-copy{
        cursor: pointer;
        margin-left:15px
    }
</style>