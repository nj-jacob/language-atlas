/* Language Atlas Heart words: the sets of tricky words, loaded when the tool first opens.
   Atlas.hearts.add(band, 'word word ...'): one set of 10 (the last set of a band may be shorter). In a word, [ ] marks the heart part:
   the letters that do not say their usual sound, or say a sound not taught yet, so they are learned by heart. Everything else is
   sounded out as usual. Kindergarten and Grade 1 follow the decodable readers' heart words, in the same order; Grades 2 and 3 add
   common words with odd spellings, including Canadian ones (colour, centre); Grades 4 to 8 add longer tricky words, including
   every heart word of the Grades 4 to 8 spelling steps. tests/hearts.js checks every word. */
(function () {
  var add = Atlas.hearts.add;
  add('K', 'th[e] [a] [I] i[s] t[o] w[a][s] s[ai]d y[ou] [o][f] d[o]');
  add('K', 'g[o] n[o] p[u]t h[e] sh[e] w[e] m[e] b[e] ar[e] hav[e]');
  add('K', 'th[ey] [one] t[wo] l[oo]k s[ee] wh[a]t [wh][o] th[ere] wh[ere] w[ere]');
  add('K', 'c[o]m[e] s[o]m[e] y[our] fr[o]m m[y] b[y] h[ere] giv[e] liv[e] s[ay][s]');
  add('K', 'd[oe][s] w[a]nt');
  add('1', 'f[u]ll p[u]ll p[u]sh w[al]k t[al]k w[a]t[er] [o]nly [o]ther fr[ie]nd m[a]ny');
  add('1', '[a]ny c[oul]d w[oul]d sh[oul]d p[eo]pl[e] ag[ai]n bec[au]s[e] l[o]v[e] d[o]n[e] g[o]n[e]');
  add('1', '[o]nce b[o]th [eye] w[or]k w[or]d w[or]ld m[o]ther br[o]ther f[a]ther g[oe][s]');
  add('1', 'sh[oe] w[a]tch w[a]sh ver[y] ev[e]ry gr[ea]t br[ea]k [w]hole m[o]v[e] b[u]y');
  add('1', 'b[u]sy fr[o]nt m[o]nth [s]ure [s]ug[ar] [o]ver [o]pen [e]ven m[o]st pr[e]tty');
  add('1', 'r[ea]dy lis[t]en of[t]en w[ar]m w[ar] d[oor] fl[oor] l[ear]n [ear]ly [ear]th');
  add('1', 'h[ear]d th[eir] [eigh]t h[ea]d br[ea]d f[our] p[our] thr[ough] th[ough] s[ou]p');
  add('1', 'gr[ou]p bl[oo]d fl[oo]d [our] [h]our l[augh] ch[al]k [wh][o]se l[o]s[e] d[ou]ble');
  add('1', 'tr[ou]ble p[o]st gh[o]st ans[w]er an[o]ther n[o]thing w[o]m[e]n c[ou]ntry');
  add('2', 'ab[o]v[e] [a]cross ag[ai]nst [al]most [al]so [al]ways am[o]ng [au]nt b[ee]n bel[ie]ve');
  add('2', 'b[ui]ld b[ui]lt ca[l]f cl[o]th[e]s c[ou]s[i]n c[ou]ple g[u]ess g[u]ide ha[l]f [h]onest');
  add('2', 'i[s]land j[ui]ce min[u]te m[o]n[ey] n[o]ne p[ie]ce s[o]n t[ou]ch w[o]lf w[o]man');
  add('2', 'w[o]nder y[ou]ng gl[o]v[e] [o]v[e]n c[o]ver h[o]n[ey] m[o]nk[ey] col[our] cent[re] met[re]');
  add('2', 'h[ear]t cas[t]le whis[t]le br[ea]kfast id[ea] s[ou]th[er]n fl[ow][er] [al]r[ea]dy en[ough] w[o]rry');
  add('3', 'b[eau]tiful b[u]s[i]ness cu[p]b[oar]d fav[ou]rite g[u]ard h[eigh]t [h]on[our] n[eigh]b[our] o[ce]an pol[i]ce');
  add('3', 'rec[ei]ve [sc]ience [sc]i[ss]ors sep[a]rate si[g]n spe[ci]al str[aigh]t s[u]rprise s[w]ord t[o]ng[ue]');
  add('3', 'tow[ar]d u[s]ually vill[a]ge w[ei]rd We[d]n[e]sday cal[e]nd[ar] ch[ie]f c[ough] d[augh]ter f[ie]ld');
  add('3', 'f[ie]rce for[eig]n j[our]n[ey] lang[u]age l[eo]pard misch[ie]f mus[c]le [o]nion pig[eo]n prom[i]se');
  add('3', 'purp[o]se ques[ti]on r[ough] sh[ou]lder sol[di]er sw[ea]t t[ough] v[iew] mount[ai]n capt[ai]n');
  add('3', 'cert[ai]n theat[re] lib[r]ary kn[ow]ledge colum[n] cl[i]mb [ch][oi]r [ch]orus');
  add('4', 'w[ea]ther d[a]nger h[ea]vy sw[ea]ter inst[ea]d m[ea]dow c[ou]r[a]ge f[our]th ex[ci]te thr[ough]out');
  add('4', 'prob[a]bly fin[a]lly int[e]resting ch[o]colate diff[e]rent fam[i]ly cam[e]ra sev[e]ral gen[e]ral mem[o]ry');
  add('4', 'w[ei]ght th[ough]t b[ough]t br[ough]t c[augh]t t[augh]t n[augh]ty fr[ei]ght r[ei]ndeer s[ei]ze');
  add('4', 'qu[ar]ter w[or]th w[or]m w[or]se w[a]nder sw[a]llow sq[ua]d sq[ua]sh qu[a]lity w[a]sp');
  add('5', 'dou[b]t g[ui]tar veg[e]table r[hy]thm ex[h]aust ex[h]ibit ca[l]m pa[l]m sa[l]mon w[h]ether');
  add('5', 'ach[ie]ve anc[ie]nt p[ie]rce s[ie]ge sh[ie]ld y[ie]ld gr[ie]f br[ie]f n[ie]ce f[ie]ry');
  add('5', 'ma[ch]ine [ch]ef para[ch]ute [ch]aracter [ch]emical sto[mach] a[ch]e s[ch]edule me[ch]anic e[ch]o');
  add('5', 'thor[ough] th[ough]tful dr[ough]t pl[ough] b[ough] m[ou]ld c[ou]rtesy j[ou]rnal t[ou]rnament n[ou]rish');
  add('6', 'o[ugh]t rest[au]rant s[ou]venir r[ou]te plat[eau] bur[eau] amat[eu]r camo[u]flage b[ei]ge gara[ge]');
  add('6', 'ex[h]ilarate enviro[n]ment gover[n]ment priv[i]lege rel[e]vant math[e]matics exp[e]rience app[a]rent hum[o]rous vig[o]rous');
  add('6', 'autum[n] condem[n] hym[n] solem[n] [g]nome ras[p]berry recei[p]t han[d]some sub[t]le [h]eir');
  add('6', 'caff[ei]ne prot[ei]n n[ei]ther [ei]ther c[ei]ling conc[ei]t dec[ei]ve perc[ei]ve l[ei]sure');
  add('7', 'c[olo]nel or[ch]estra ya[ch]t [ch]aos Feb[r]uary public[ly] q[ueue] [ch]ameleon s[ch]olar epo[ch]');
  add('7', 'ac[q]uaint ac[q]uire con[sc]ious misch[ie]vous perm[a]nent indep[e]nd[e]nt exist[e]nce resist[a]nce guar[a]ntee app[ea]rance');
  add('7', 'h[y]g[ie]ne para[ll]el s[y]llable [x]ylophone s[y]mphony t[y]phoon h[y]pothesis s[y]mpathy anon[y]mous c[y]linder');
  add('7', 'in[d]ict mor[t]gage campai[g]n cor[ps] rendez[vous] tom[b] as[th]ma is[th]mus [th]yme pla[i]d');
  add('8', 'con[sc]ience Cel[si]us sover[ei]gn pron[ou]nce l[ieu]tenant ve[h]icle con[sc]ientious man[oeu]vre entrepr[e]neur bour[geoi]sie');
  add('8', 'mi[ll]ennium persev[er]ance questio[nn]aire li[ai]son hier[ar]chy pavil[i]on remini[sc]ent sacri[le]gious indisp[e]nsable mini[a]ture');
  add('8', 'epitom[e] hyperbol[e] catastroph[e] apostroph[e] [ch]asm [ch]ronological r[h]etoric collea[gue] fati[gue] intri[gue]');
  add('8', 'ha[r]ass occu[rr]ence commi[t]ment po[ss]e[ss]ion disa[pp]oint mi[ss]pell u[nn]ecessary tranqui[ll]ity dum[bb]ell e[x]aggerate');
})();
