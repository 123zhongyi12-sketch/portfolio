# 独立简历站点部署操作手册

## 概述

当前代码仓库包含四个简历方向：售前、运维、云安全、通用。通过 URL 参数切换：

| 参数 | 内容 |
|------|------|
| `?r=p` 或 `?resume=presales` | 解决方案技术支持工程师 |
| `?r=o` 或 `?resume=ops` | IT运维工程师 |
| `?r=c` 或 `?resume=cloud-security` | 云安全工程师 |
| `?r=g` 或 `?resume=general` | 通用简历 |

也可以设置环境变量 `NEXT_PUBLIC_RESUME_SLUG`，在 Vercel 上部署为独立的站点，每个站点绑定自己的域名。

## 前提条件

- 已有 GitHub 账号，且当前仓库已推送到 `123zhongyi12-sketch/portfolio`
- 已有 Vercel 账号（目前 `zhyi.vercel.app` 已部署）
- 已有 Cloudflare 账号（目前 `zy-bqw.pages.dev` 已部署）
- 准备两个新域名（例如 `yunwei.你的域名.com` 和 `anquan.你的域名.com`），或者在 Vercel 免费使用 `xxx.vercel.app` 子域名

---

## Cloudflare Pages 部署（已配置）

站点地址：`https://zy-bqw.pages.dev`，通过 URL 参数切换四个简历：

```
https://zy-bqw.pages.dev/?r=p   售前
https://zy-bqw.pages.dev/?r=o   运维
https://zy-bqw.pages.dev/?r=c   云安全
https://zy-bqw.pages.dev/?r=g   通用
```

### 部署配置（重建时的关键设置）

Cloudflare Pages 项目创建时，**Framework preset 必须选择「Next.js (Static HTML Export)」**，不是普通的 Next.js：

| 设置项 | 值 |
|--------|-----|
| Project name | `zy`（域名 = 项目名 + `.pages.dev`，如果被占用会自动加后缀） |
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npx next build`（自动填充） |
| Build output directory | `out`（自动填充） |

> ⚠️ 如果选了普通 Next.js 预设，Cloudflare 会用 OpenNext 适配器（`npx opennextjs-cloudflare build`）导致部署失败。静态导出站点必须选 Static HTML Export 预设。

### 注意

- 项目创建后无法再改构建预设，只能删除重建
- `public/_redirects`（`/* /index.html 200`）仅作为 SPA 回退，静态文件优先返回，不影响 `/portfolio`、`/projects/xxx` 等独立页面
- 更新代码推送到 GitHub 后 Cloudflare 会自动重新部署

---

## 第一步：创建运维独立站点

### 1.1 登录 Vercel

打开 https://vercel.com 并登录你的账号。

### 1.2 新建项目

1. 点击右上角 **Add New → Project**
2. 在 **Import Git Repository** 中找到 `123zhongyi12-sketch/portfolio`，点击 **Import**
3. 如果列表中找不到，点击 **Adjust GitHub App Permissions** 授权，或者直接在 GitHub 搜索 `123zhongyi12-sketch/portfolio`

### 1.3 配置项目

在 **Configure Project** 页面：

1. **Project Name**: 填写 `portfolio-ops`（或其他你喜欢的名字）
2. **Framework Preset**: 确保选择 **Next.js**
3. 展开 **Environment Variables** 部分
4. 点击 **Add**，添加：
   - **Name**: `NEXT_PUBLIC_RESUME_SLUG`
   - **Value**: `ops`
5. 其他保持默认，点击 **Deploy**

### 1.4 等待部署完成

约 1-2 分钟后，Vercel 显示 **Congratulations!** 页面，点击 **Continue to Dashboard**。

### 1.5 绑定域名（可选）

默认你会得到一个 `portfolio-ops.vercel.app` 域名。如果要绑定自己的域名：

1. 在项目 Dashboard 中，点击顶部的 **Domains**（或 Settings → Domains）
2. 输入你的域名（例如 `yunwei.example.com`），点击 **Add**
3. 按照 Vercel 提示，在你的域名 DNS 管理后台添加对应的 CNAME 或 NS 记录
4. 等待 DNS 生效（一般几分钟到几小时）

### 1.6 验证

打开你的新站点（`portfolio-ops.vercel.app` 或自定义域名），应该直接看到**云运维工程师**简历页面，不显示售前/云安全的导航。

---

## 第二步：创建云安全独立站点

步骤完全同上，只有一个不同：

| 项目 | 运维 | 云安全 |
|------|------|--------|
| Project Name | `portfolio-ops` | `portfolio-security` |
| NEXT_PUBLIC_RESUME_SLUG | `ops` | `cloud-security` |
| 默认域名 | `portfolio-ops.vercel.app` | `portfolio-security.vercel.app` |

### 具体操作

1. Vercel → **Add New → Project** → 导入同一个 repo `123zhongyi12-sketch/portfolio`
2. **Project Name**: 填 `portfolio-security`
3. **Environment Variables**:
   - Name: `NEXT_PUBLIC_RESUME_SLUG`
   - Value: `cloud-security`
4. 点击 **Deploy**
5. （可选）绑定域名

---

## 第三步：验证三个站点

| 站点 | 访问地址 | 显示内容 |
|------|---------|---------|
| 售前（已有） | `zhyi.vercel.app` | 解决方案售前工程师 |
| 运维（新建） | `portfolio-ops.vercel.app` | 云运维工程师 |
| 云安全（新建） | `portfolio-security.vercel.app` | 云安全工程师 |
| Cloudflare（已有） | `zy-bqw.pages.dev/?r=p` | 按 URL 参数切换四种简历 |

打开每个站点确认：
- ✅ 首页直接显示对应简历
- ✅ 个人优势与简历一致
- ✅ 技能列表正确
- ✅ 项目与成果正确
- ✅ 校园经历正确
- ✅ 作品集页正常访问
- ✅ 项目详情页正常打开

---

## 后续更新内容

三个站点共享同一个 GitHub 仓库。更新内容时：

1. 修改本地文件（`data/` 目录下的 JSON、`content/projects/` 下的 markdown 等）
2. `git add` → `git commit` → `git push`
3. Vercel 会自动重新部署所有三个站点

**注意**：如果修改了 `data/resumes.json` 或 `content/projects/` 下的内容，所有三个站点会同步更新。如果需要让不同站点显示不同的项目，请在 `resumeTargets` 数组中控制。

---

## 常见问题

### Q: 部署失败怎么办？
A: 在 Vercel 项目 Dashboard 点击 **Deployments**，查看最近一次的构建日志。常见原因：
- 代码类型错误 → 在本地 `npm run build` 检查通过后再 push
- 环境变量名字拼写错误 → 检查是否准确写为 `NEXT_PUBLIC_RESUME_SLUG`

### Q: 可以不要域名直接用 vercel.app 吗？
A: 可以。`portfolio-ops.vercel.app` 和 `portfolio-security.vercel.app` 直接可用，不需要购买域名。

### Q: 以后想改其中某个站点的内容怎么办？
A: 因为所有站点共享同一仓库，修改数据文件会同步到所有站点。如果未来需要独立内容，需要拆分为独立的 GitHub 仓库。
