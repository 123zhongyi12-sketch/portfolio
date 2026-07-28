# 内容编辑指南

本指南说明如何编辑网站内容，无需修改任何源代码。

---

## 快速开始

所有网站内容存储在以下 JSON 和 Markdown 文件中：

| 用途 | 文件路径 |
|------|----------|
| 个人信息 | `data/profile.json` |
| 简历方向 | `data/resumes.json` |
| 项目列表 | `data/projects.json` |
| 项目详情 | `content/projects/<slug>/index.md` |
| 项目文件树 | `content/projects/<slug>/structure.json` |
| 项目图片 | `public/content/projects/<slug>/images/` |

---

## 编辑个人信息

编辑 `data/profile.json`：

```json
{
  "name": "钟懿",
  "title": "云计算解决方案架构师",
  "email": "你的邮箱@example.com",
  "phone": "你的手机号",
  "avatar": "",
  "location": "深圳",
  "social": {
    "github": "你的GitHub用户名",
    "linkedin": "你的LinkedIn用户名"
  },
  "summary": "个人简介文字..."
}
```

---

## 编辑简历方向

编辑 `data/resumes.json`。每个简历方向（presales / ops / cloud-security）包含：

- `slug` — URL 路径（不要修改）
- `label` — 页面按钮显示的标签名
- `title` — 页面大标题
- `subtitle` — 页面副标题
- `summary` — 个人概述
- `projectOrder` — 项目显示顺序（slug 数组）
- `skills` — 技能列表
- `experience` — 经历列表

**示例：添加技能**
```json
"skills": [
  { "name": "华为云", "category": "技术栈" },
  { "name": "新技能名", "category": "分类名" }
]
```

**示例：添加经历**
```json
"experience": [
  {
    "title": "职位/角色",
    "organization": "公司/组织名",
    "period": "时间范围",
    "description": "工作内容描述"
  }
]
```

---

## 编辑项目

### 1. 在 `data/projects.json` 中注册

```json
{
  "slug": "project-slug",
  "title": "项目标题",
  "description": "简短描述（显示在卡片上）",
  "category": "code | achievement | certification",
  "year": "2024",
  "tags": ["标签1", "标签2"],
  "resumeTargets": ["presales", "ops"],
  "techStack": ["技术1", "技术2"],
  "githubUrl": "https://github.com/xxx",
  "summary": "个人总结（显示在项目详情页底部蓝色区域）"
}
```

### 2. 创建项目详情

在 `content/projects/<slug>/` 下创建：

- **`index.md`** — 项目详细介绍（纯文本，每段作为独立段落显示）
- **`structure.json`** — （仅 code 类项目）文件树结构
- **`images/`** — 截图图片（在 `public/content/projects/<slug>/images/` 下）

### 文件树格式示例

```json
[
  {
    "name": "project-root",
    "type": "folder",
    "children": [
      { "name": "src", "type": "folder", "children": [...] },
      { "name": "package.json", "type": "file" },
      { "name": "README.md", "type": "file" }
    ]
  }
]
```

---

## 修改样式

如果只想调颜色，编辑 `src/app/globals.css`：

- `--color-accent` — 主色调（当前为蓝色）
- `--color-accent-secondary` — 辅色调（当前为青色）
- `--color-bg` — 背景
- `--color-card` — 卡片背景
- `--color-border` — 边框

---

## 发布到线上

1. 将代码推送到 GitHub
2. 在 Vercel 中导入该 GitHub 仓库
3. 框架选择 **Next.js**
4. 部署

每次推送代码到 GitHub，Vercel 会自动重新部署。

---

## 注意事项

- **不要修改 `src/` 目录下的任何文件**（除非要改功能/样式）
- 图片文件名不要包含空格和中文
- 项目详情 Markdown 目前仅支持纯文本段落（无标题/列表/链接格式）
- 修改后本地运行 `npm run build` 确认无报错再推送
