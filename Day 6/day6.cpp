#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int findMinPath(vector<vector<int>> &V) {
    int R = V.size();
    int C = V[0].size();

    vector<vector<int>> dp(R, vector<int>(C));

    dp[0][0] = V[0][0];

    for (int i = 1; i < R; i++)
        dp[i][0] = dp[i - 1][0] + V[i][0];

    for (int j = 1; j < C; j++)
        dp[0][j] = dp[0][j - 1] + V[0][j];

    for (int i = 1; i < R; i++) {
        for (int j = 1; j < C; j++) {
            dp[i][j] = V[i][j] + min(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[R - 1][C - 1];
}

int main() {
    vector<vector<int>> V = {
        {1, 3, 1},
        {1, 5, 1},
        {4, 2, 1}
    };

    cout << findMinPath(V);
    return 0;
}
