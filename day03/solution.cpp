#include <fstream>
#include <iostream>
#include <string>
#include <vector>

struct coordinate
{
    int x;
    int y;
};

coordinate adjacentSpots[8] = {{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}};

bool findAdjacentSymbol(std::vector<std::string> &lines, int i, int j)
{
    for (int k = 0; k < 8; k++)
    {
        int y = i + adjacentSpots[k].y;
        int x = j + adjacentSpots[k].x;

        if (x < 0 || x >= lines[i].length() || y < 0 || y >= lines.size())
        {
            continue;
        }

        if (lines[y][x] != '.' && !std::isdigit(lines[y][x]))
        {
            return true;
        }
    }

    return false;
}

int findFullNumber(std::vector<std::string> &lines, int i, int j)
{
    std::string currentNumber = "";
    currentNumber += lines[i][j];

    for (int k = j + 1; k < lines[i].length(); k++)
    {
        if (!std::isdigit(lines[i][k]))
        {
            break;
        }

        currentNumber += lines[i][k];
    }

    for (int k = j - 1; k >= 0; k--)
    {
        if (!std::isdigit(lines[i][k]))
        {
            break;
        }

        currentNumber = lines[i][k] + currentNumber;
    }

    return std::stoi(currentNumber);
}

std::vector<int> findAdjacentNumbers(std::vector<std::string> &lines, int i, int j)
{
    std::vector<int> adjacentNumbers;

    for (int k = 0; k < 8; k++)
    {
        int x = i + adjacentSpots[k].y;
        int y = j + adjacentSpots[k].x;

        if (x < 0 || x >= lines.size() || y < 0 || y >= lines[i].length())
        {
            continue;
        }

        if (std::isdigit(lines[x][y]))
        {
            adjacentNumbers.push_back(findFullNumber(lines, x, y));
        }
    }

    return adjacentNumbers;
}

void removeDuplicates(std::vector<int> &numbers)
{
    for (int i = 0; i < numbers.size(); i++)
    {
        for (int j = i + 1; j < numbers.size(); j++)
        {
            if (numbers[i] == numbers[j])
            {
                numbers.erase(numbers.begin() + j);
                j--;
            }
        }
    }
}

void firstProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    for (int i = 0; i < lines.size(); i++)
    {
        bool hasAdjacentSymbol = false;
        std::string currentNumber = "";

        for (int j = 0; j < lines[i].length(); j++)
        {
            if (!std::isdigit(lines[i][j]))
            {
                if (hasAdjacentSymbol && currentNumber.length() > 0)
                {
                    solution += std::stoi(currentNumber);
                }

                currentNumber = "";
                hasAdjacentSymbol = false;

                continue;
            }

            currentNumber += lines[i][j];

            if (findAdjacentSymbol(lines, i, j))
            {
                hasAdjacentSymbol = true;
            }
        }
    }

    std::cout << solution << std::endl;
}

void secondProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    for (int i = 0; i < lines.size(); i++)
    {
        for (int j = 0; j < lines[i].length() + 1; j++)
        {
            if (lines[i][j] != '*')
            {
                continue;
            }

            std::vector<int> adjacentNumbers = findAdjacentNumbers(lines, i, j);
            removeDuplicates(adjacentNumbers);

            if (adjacentNumbers.size() == 2)
            {
                solution += adjacentNumbers[0] * adjacentNumbers[1];
            }
        }
    }

    std::cout << solution << std::endl;
}

int main()
{
    std::ifstream myFile;

    myFile.open("input.txt");

    if (!myFile.is_open())
    {
        std::cout << "Unable to open file" << std::endl;
        return 1;
    }

    std::string line;
    std::vector<std::string> lines;

    while (std::getline(myFile, line))
    {
        if (line.empty())
        {
            break;
        }

        lines.push_back(line);
    }

    firstProblem(lines);
    secondProblem(lines);

    return 0;
}
